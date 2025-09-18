export default function ReviewCard({ review, onToggleApprove }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#fff"
  };
  const categoryStyle = {
    display: "inline-block",
    padding: "2px 5px",
    marginRight: "5px",
    fontSize: "12px",
    backgroundColor: "#eee",
    borderRadius: "3px"
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong>{review.guestName}</strong><br/>
          <small>{new Date(review.submittedAt).toLocaleDateString()}</small>
        </div>
        <div style={{ textAlign: "right" }}>
          <div>{review.rating ?? "—"} / 5</div>
          <div style={{ fontSize: "12px" }}>{review.channel}</div>
        </div>
      </div>
      <p>{review.publicReview}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
        <div>
          {review.categories?.map(c => (
            <span key={c.category} style={categoryStyle}>{c.category}{c.rating ? ` (${c.rating})` : ""}</span>
          ))}
        </div>
        <label>
          <input type="checkbox" checked={review.approved} onChange={() => onToggleApprove(review.id)} /> Approved
        </label>
      </div>
    </div>
  );
}
