import fs from "fs";
import path from "path";

// Hostaway sandbox credentials
const ACCOUNT_ID = "61148";
const API_KEY = "f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152";

function parseDate(raw) {
  if (!raw) return null;
  const t = raw.trim().replace(" ", "T");
  return new Date(t + "Z").toISOString();
}

function normalizeRating(rawRating) {
  if (rawRating == null) return null;
  const r = Number(rawRating);
  if (isNaN(r)) return null;
  return r > 5 ? Math.round((r / 2) * 10) / 10 : r;
}

function normalizeReview(raw) {
  const id = raw.id ?? null;
  const listingName = raw.listingName ?? null;
  const listingId = raw.listingId ?? null;
  const type = raw.type ?? null;
  const channel = raw.channel ?? "hostaway";
  const status = raw.status ?? "published";
  const publicReview = raw.publicReview ?? "";
  const guestName = raw.guestName ?? "Guest";
  const submittedAt = parseDate(raw.submittedAt);
  const rating = normalizeRating(raw.rating);

  let categories = [];
  if (Array.isArray(raw.reviewCategory)) {
    categories = raw.reviewCategory
      .filter(Boolean)
      .map((c) => ({
        category: c.category ?? null,
        rating: normalizeRating(c.rating ?? null),
      }))
      .filter((c) => c.category);
  }

  return {
    id,
    listingId,
    listingName,
    type,
    channel,
    status,
    publicReview,
    submittedAt,
    guestName,
    rating,
    categories,
    approved: false
  };
}

export default async function handler(req, res) {
  try {
    const apiUrl = "https://api.hostaway.com/v1/reviews"; // original link to reviews if sandbox is not empty
    let sandboxData = null;
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Account-ID": ACCOUNT_ID,
          "Content-Type": "application/json"
        }
      });
      sandboxData = await response.json();
    } catch (err) {
      console.warn("Failed to fetch sandbox API, falling back to mock JSON", err);
    }

    let items = [];
    if (sandboxData?.result && sandboxData.result.length > 0) {
      items = sandboxData.result;
    } else {
      // 2️⃣ Fallback to mock JSON in public/data
      try {
        const filePath = path.join(process.cwd(), "public", "data", "hostaway-mock.json");
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileContent);
        items = Array.isArray(parsed?.result) ? parsed.result : [];
      } catch (e) {
        console.error("Failed to load fallback mock JSON", e);
        items = [];
      }
    }


    const normalized = items.map(normalizeReview).sort((a, b) => {
      const ta = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
      const tb = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
      return tb - ta;
    });

    res.status(200).json({ status: "success", result: normalized });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to read reviews", details: String(err) });
  }
}
