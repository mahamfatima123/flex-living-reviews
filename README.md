# Flex Living Reviews Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-0088FE?style=for-the-badge&logo=databricks&logoColor=white)](https://recharts.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://your-vercel-link.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

A web application built for **Flex Living** to manage and display property reviews. The platform enables managers to monitor guest feedback, approve or reject reviews, visualize property performance, and display selected reviews publicly.  

Live demo: [Vercel Deployment](https://flex-living-reviews-sooty.vercel.app/)
---
## Features

### Manager Dashboard
The dashboard allows property managers to efficiently monitor and manage guest reviews:
- **View all properties** with their reviews in one interface.
- **Filter reviews** by:
  - Rating
  - Review category (cleanliness, communication, comfort, etc.)
  - Channel (Hostaway, Google, Airbnb)
  - Date range
- **Approve or reject reviews** individually or in bulk.
- **Search reviews** by guest name or text content.
- **Analytics and charts**:
  - Average rating per property
  - Category-wise ratings
  - Rating trends over time  
---

### Property Detail Page
Each property has a dedicated page showing:
- Property images and gallery
- Features, amenities, and description
- Pricing and availability
- Review analytics:
  - Average rating
  - Category distribution (cleanliness, communication, comfort)
  - Rating trends over time
- Review management:
  - Approve/reject individual reviews
  - Bulk approve/reject  
---

### Public Property Pages
Approved reviews are displayed publicly on the property page:
- Property details: images, description, features
- Pricing and booking summary with date selection
- **Approved guest reviews** only
- Average rating and total number of reviews  
---
## Data & API

### Hostaway Reviews
- Reviews are fetched from a **mock Hostaway API** stored in `/public/data/hostaway-mock.json`.
- Reviews are **normalized** in the API route `/api/reviews/hostaway` for consistent frontend use.
- Normalized fields include:
  - `id`, `listingId`, `listingName`, `type`, `channel`, `rating`
  - `reviewCategory` (array)
  - `publicReview`, `submittedAt`, `guestName`, `approved` (approval state)
### Properties Data
- Properties data stored in `/public/data/properties.json` includes:
  - Images and gallery
  - Channels (Airbnb, Hostaway, Google)
  - Features (bedrooms, baths, amenities)
  - Pricing, availability, deposit, weekly discounts
  - Detailed description
### Approvals
- Review approval status is stored in **LocalStorage** so that managers’ selections persist between sessions.
---
## Tech Stack
- **Next.js** – Frontend and backend API
- **React** – UI components
- **Tailwind CSS** – Styling
- **Recharts** – Charts for analytics
- **LocalStorage** – Store review approvals
- **Deployment** – Vercel
---
## Getting Started

### Prerequisites
- Node.js v20+
- npm

### Installation
1. Clone the repository:
git clone https://github.com/your-username/flex-living-reviews.git
2. Navigate to the project folder:
cd flex-living-reviews
3. Install dependencies:
npm install
4. Run the development server:
npm run dev
5. Open [http://localhost:3000](http://localhost:3000) in your browser.
---
## File Structure
/components # Reusable UI components (PropertyCard, Filters, HeroBanner, PublicReviewCard, Footer)
/pages # Next.js pages (dashboard, property details, public pages)
/pages/api # API route for fetching and normalizing reviews
/public/data # Mock JSON data (properties.json, hostaway-mock.json)
/public/images # Property and UI images
---
## How Reviews Work
- Reviews are fetched via `/api/reviews/hostaway`.
- Each review is normalized:
  - Ratings scaled if needed
  - Review categories extracted
  - Default values for missing fields
- Managers can approve/reject reviews:
  - Individual approvals using checkboxes
  - Bulk approve/reject buttons
- Only approved reviews appear on the public property pages.
---
## Future Improvements
- Integrate real Google Reviews alongside Hostaway reviews.
- Store approvals in a database instead of LocalStorage for multi-user access.
- Add advanced analytics:
  - Identify trends
  - Detect recurring issues
  - Highlight average response times
- Enhance booking features on public pages.
---
## Screenshots
- Dashboard Overview  
- Property Detail with Charts  
- Public Property Page  
---
## Contributing
Contributions are welcome!  
1. Fork the repository  
2. Create a feature branch (`git checkout -b feature-branch`)  
3. Commit your changes (`git commit -m "Added new feature"`)  
4. Push to the branch (`git push origin feature-branch`)  
5. Open a Pull Request  

Please follow the existing coding style and open an issue first for major changes.
---
## Author
Maham Fatima
