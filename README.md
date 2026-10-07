# Campus Connect AI 🎓👨‍👩‍👧
### Parent-First College Decision & Responsible AI Guidance Platform

A calm, trustworthy, mobile-first college decision platform designed for Indian families evaluating higher education admissions (TNEA / Engineering / Autonomous Institutions).

---

## 🌟 Product Vision & UX Shift

Campus Connect AI transforms the anxiety-inducing college admissions journey into a calm, structured, parent-first decision companion. Instead of an uncurated student social network, it prioritizes the questions parents need answered within **5 seconds**:

1. **Child Fit**: Does this college match my child's Class 12 marks / TNEA cutoff?
2. **Total Cost of Education**: What is the transparent annual tuition, exam fee, and living expense without hidden surprises?
3. **Hostel & Campus Safety**: Are there safe on-campus hostels with residential wardens, 24/7 security, health clinics, and GPS-tracked buses?
4. **Institutional Quality**: What is the NIRF rank, NAAC accreditation, and true median placement package?
5. **Responsible AI Guidance**: Why is this campus recommended, and what are the realistic admission odds without false guarantees?

---

## 👨‍👩‍👧 Default Family Persona

- **Parent User**: **Ravi Kumar**
- **Active Child**: **Ananya Kumar** (Daughter)
  - Class 12 PCM Aggregate: **88.0%** (Maths: 90, Physics: 86, Chem: 88)
  - TNEA Equivalent Cutoff: **176.0 / 200**
  - Preferred Program: **B.E. Computer Science and Engineering**
  - Region: **Tamil Nadu** (Coimbatore / Chennai)
  - Budget: **Moderate (₹1.50L - ₹2.00L / year)**
  - Living: **Safe On-Campus Hostel Required**
- **Secondary Child**: **Mitra Kumar** (Son, Class 12, 91.5%, Cutoff 183.0, B.Tech AI & DS) — switchable with one click via the Family Profile and Navigation bar.

---

## 🔑 Key Features & Architecture

### 1. Parent Decision Dashboard (`#home`)
- **Child Status Card**: Immediate visibility into Ananya's 88% marks, 176 cutoff, and family preferences.
- **Urgent Action Banner**: High-priority counselling deadline alerts (e.g. DoTE Certificate Verification in 12 days).
- **"Best Matches for Ananya"**: 5-second fact tiles on every card:
  - Admission Fit Badge: `HIGH FIT` (SKCET), `GOOD FIT` (REC), `STRETCH` (PSG Tech), `BACKUP` (Sairam).
  - Estimated Annual Tuition & Hostel Fee.
  - Verified 2025 Closing Cutoff.
  - Parent Decision Checklist with checkmarks.
- **Common Parent AI Questions**: 1-click prompt pills for instant advisory answers.
- **Student & Alumni Voices**: Authentic student perspectives contextualized to support family evaluation.

### 2. Deep College Profile with 7 Parent Priority Tabs (`#college-profile?id=skcet`)
- **Top 4 Quick Facts Bar**: Program, Annual Tuition, Hostel Accommodation, 2025 Cutoff.
- **Tab 1: Is this college suitable?**: Plain-language recommendation verdict for Ananya, NIRF #77, NAAC 'A', and parent checklist.
- **Tab 2: Admission & Cutoffs**: Verified DoTE Tamil Nadu historical closing ranks by quota (OC, BC, BCM, MBC, SC, ST) with a non-guarantee notice.
- **Tab 3: Fees & Total Cost**: Itemized tuition, university exam fees, caution deposits, hostel room & mess, scholarships, and payment schedules.
- **Tab 4: Courses Offered**: Seat intake, duration, and curriculum highlights.
- **Tab 5: Hostel, Commute & Safety**: Residential wings, warden oversight, CCTV coverage, multi-cuisine dining, on-campus clinic, 60+ GPS-tracked buses, and parent campus visit verification list.
- **Tab 6: Campus Life**: Innovation labs, hackathons, and clubs.
- **Tab 7: Student Experiences**: Unbiased perspectives from verified students and alumni.

### 3. College Decision Assistant (`#ai-guide`)
- Conversational advisory engine with parent quick-question pills.
- Transparent 4-factor suitability weighting:
  - **Academic Fit**: 40% (Marks vs DoTE closing cutoff)
  - **Course Match**: 25% (Department strength & labs)
  - **Location Preference**: 20% (Coimbatore/Chennai proximity)
  - **Budget Compatibility**: 15% (Tuition & living expenses)
- Algorithmic Explainability Modal (**"Why this fits Ananya"**) with official DoTE archive timestamps.

### 4. Categorized Shortlist & Deadlines (`#saved`)
- 3 distinct parent evaluation tiers:
  - **BEST FIT**: Primary realistic targets (e.g., SKCET).
  - **GOOD OPTIONS**: Strong competitive choices (e.g., REC, KCT).
  - **BACKUP OPTIONS**: Safe fallback options (e.g., Sairam).
- Interactive tier mover buttons to promote/demote colleges.
- Action-oriented deadline cards with "ACTION NEEDED" alerts.

### 5. Side-by-Side Comparison ("Which one fits us better?", `#compare`)
- Multi-college matrix comparing fees, hostel cost, median CTC, 2025 cutoff, and parent verdict with difference highlighting.

### 6. Family Profile (`#profile`)
- Parent details (Ravi Kumar), active child academic scorecard, child-switcher (`Ananya` ⇄ `Mitra`), and AI advisory audit trail.

---

## 📱 Mobile-First & Responsive UX

- **Mobile Viewports (360px+)**: Sticky parent header, bottom navigation bar (Dashboard, Explore, Assistant, Shortlist, Profile), thumb-accessible controls, responsive fact tiles.
- **Desktop Viewports (1024px+)**: 260px academic sidebar, universal search, 3-column responsive grids, full comparison matrices.

---

## 🚀 Running the Application Locally

The project includes a lightweight PowerShell HTTP daemon (`server.ps1`) serving standard HTML5, CSS3, and ES modules:

```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 3000
```

Open your browser at:
```
http://localhost:3000/#landing
```

---

## 🎯 Evaluator Demo Tour (1-Click Walkthrough)

To experience the full parent decision flow:
1. Click **"🚀 Run Parent Decision Tour"** on the landing page or open `#ai-guide`.
2. The Decision Assistant will automatically evaluate **Ananya's 88% PCM / 176 Cutoff**:
   - Matches **SKCET Coimbatore** as **HIGH FIT (94%)**.
   - Matches **REC Chennai** as **GOOD FIT (88%)**.
   - Identifies **PSG Tech** as **STRETCH (72%)** and **Sairam** as **BACKUP (83%)**.
3. Click **"Why this fits Ananya"** on SKCET to inspect the 4-factor explainability score.
4. Click **"View Full Details"** to explore the 7 Parent Priority Tabs.
5. Navigate to **Your Shortlist** (`#saved`) to inspect categorized tiers and counselling deadlines.
6. Navigate to **Family Profile** (`#profile`) to test the **Child Switcher** between Ananya and Mitra.
