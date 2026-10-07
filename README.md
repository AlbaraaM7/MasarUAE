# Masar UAE (مسار) - The UAE Student Co-Pilot 🇦🇪

An all-in-one Micro-SaaS designed exclusively for high school and university students across the United Arab Emirates (Dubai, Abu Dhabi, Sharjah, and beyond).

---

## 🚀 Key Modules Built

1. **AI Exam & Past Paper Coach (`/coach`)**
   - Practice official past-paper exam questions for:
     - British Curriculum (Cambridge & Edexcel IGCSE / A-Levels)
     - International Baccalaureate (IB Diploma HL & SL)
     - CBSE Class 12 Board
     - EmSAT Achieve
   - Instant AI evaluation using official marking criteria (points awarded, marks lost, examiner pitfalls, and full model solutions).

2. **UAE Student CV & Activity Portfolio Builder (`/cv-builder`)**
   - Built to highlight certified community service hours (e.g., Dubai Cares, Emirates Red Crescent, Expo City, school initiatives).
   - Extracurricular leadership tracker (MUNs, robotics, sports, student council).
   - Live interactive academic resume preview.
   - 1-click **Export / Print PDF** formatted to international and UAE university portal standards.

3. **UAE University & Scholarship Matcher (`/universities`)**
   - Curated directory of top UAE universities: AUS, NYU Abu Dhabi, Heriot-Watt Dubai, University of Birmingham Dubai, Khalifa University, Wollongong Dubai, Canadian University Dubai.
   - Filter by curriculum, budget, location, and acceptance criteria.
   - Dedicated directory of UAE scholarships (ADEK, MOE sponsorships, Merit & Corporate grants).

4. **Mu'adala (UAE Ministry of Education Equivalency) Guide (`/muadala`)**
   - Interactive, jargon-free checklist guiding British, IB, and Indian curriculum students through the official certificate equivalency process (KHDA, British Council, MOFA, and MOE portal).

5. **Student Command Center Dashboard (`/dashboard`)**
   - Daily revision streak tracking.
   - Aggregated volunteer hours counter.
   - Upcoming UAE university admission deadlines.
   - Integrated Pro membership billing presentation.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions, TypeScript)
- **Styling:** Tailwind CSS + Lucide React Icons
- **Backend API:** Next.js Route Handlers (`/api/grade`) with structured pedagogical rubrics
- **Print Engine:** Custom CSS print media queries for clean 1-page Academic CV export

---

## 🏃 Getting Started Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel in 2 Minutes

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Masar UAE Micro-SaaS"
   git branch -M main
   # add remote and push
   ```
2. Import the repository into [Vercel](https://vercel.com).
3. Click **Deploy**!
