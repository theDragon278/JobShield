# JobShield Frontend - Fake Job Detection UI

This is the React + Tailwind CSS frontend for JobShield, a job fraud detection system that helps users identify whether a listing is real, suspicious, or fake before applying.

The frontend provides a responsive, portfolio-ready dashboard where users can paste job details, run analysis, and inspect the model/rule breakdown with visual feedback.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure environment variable in `.env`:

```env
VITE_API_URL=http://localhost:8000
```

3. Start the app:

```bash
npm run dev
```

4. Open:

```text
http://localhost:5173
```

Note: Make sure the FastAPI backend is running at the URL set in `VITE_API_URL`.

## Features

- Clean landing page with product overview and supporting sections.
- Interactive job analysis dashboard with optional advanced fields.
- One-click sample demo badges:
  - `Load Sample Fake Job`
  - `Load Sample Real Job`
- `Clear` button to reset all form inputs and current results instantly.
- Risk verdict card (`REAL JOB`, `SUSPICIOUS JOB`, `FAKE JOB`).
- Animated semi-circle risk gauge with needle sweep on each new result.
- Detailed score breakdown:
  - model probability,
  - rule-based penalty,
  - final weighted score.
- Rule-trigger explanation panel for transparency.
- Skeleton loading state in the result panel while backend analysis is in progress.
- Responsive UI built with Tailwind CSS.

## Tech Stack

- React (Vite)
- Tailwind CSS
- Lucide React / React Icons
- Framer Motion

## Project Structure

```text
.
├── .env
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── vite.config.js
└── src
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── animation
    │   └── animate.js
    ├── assets
    │   ├── 1.jpg
    │   ├── 5.jpg
    │   ├── 7.jpg
    │   └── Logo1.png
    ├── components
    │   ├── Banner
    │   │   ├── Banner.jsx
    │   │   └── Banner2.jsx
    │   ├── Footer
    │   │   └── Footer.jsx
    │   ├── Hero
    │   │   └── Hero.jsx
    │   ├── JobDetection
    │   │   ├── JobDetection.jsx
    │   │   ├── ResultSkeleton.jsx
    │   │   ├── RiskBadge.jsx
    │   │   └── RiskGauge.jsx
    │   ├── Navbar
    │   │   └── Navbar.jsx
    │   ├── Services
    │   │   └── Services.jsx
    │   └── Testimonial
    │       └── Testimonial.jsx
    └── utils
        └── constants.js
```
