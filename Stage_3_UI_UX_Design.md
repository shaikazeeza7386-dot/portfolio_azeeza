# Stage 3 – UI/UX Design

**Project:** Personal Portfolio Website  
**Developer:** Azeeza Shaik  
**Degree:** B.Tech in Computer Science and Engineering (2024–2028)  
**Institution:** St. Mary's Women's Engineering College, Guntur  

---

## 1. Design System & Theme Foundations

### Color Palette (Modern Dark Slate & Glassmorphism)
- **Background Canvas:** `#080c14` (Deep Midnight Blue-Black — reduces eye fatigue, premium modern aesthetic)
- **Surface / Card Layer:** `#0f172a` and `#131d35` with `backdrop-blur-md`
- **Border / Divider:** `rgba(255, 255, 255, 0.08)` (Subtle 1px boundary)
- **Primary Accent:** `#3b82f6` (Electric Blue — Primary CTAs and active indicators)
- **Secondary Accent:** `#6366f1` / `#8b5cf6` (Indigo / Purple — AI & Emerging tech badges)
- **Status Indicator:** `#10b981` (Emerald Green — Active internship-seeking badge)
- **Primary Text:** `#f8fafc` (Pure crisp white for headlines)
- **Muted Text:** `#94a3b8` / `#64748b` (Soft slate for subtitles and body text)

### Typography & Spacing
- **Font Stack:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` for UI headings and body copy.
- **Monospace Font:** `'JetBrains Mono', monospace` for tech badges and metrics.
- **Hierarchy:**
  - Hero Display Title: `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight`
  - Section Headers: `text-2xl sm:text-3xl font-bold tracking-tight`
  - Card Titles: `text-lg sm:text-xl font-bold text-white`
  - Body Text: `text-xs sm:text-sm leading-relaxed text-slate-300`
  - Badges: `text-[10px] sm:text-xs font-semibold uppercase tracking-wider`

---

## 2. Page Information Architecture & Wireframes

### Full-Page Wireframe Structure
```
+-----------------------------------------------------------------------------------+
|  [AS] Azeeza Shaik      About   Skills   Projects   Timeline   Certificates  [GitHub] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [🟢 Seeking Internships • B.Tech CSE]             +---------------------------+  |
|  Hello! I'm AZEEZA SHAIK                            |      [ AS Avatar ]        |  |
|  CSE Student @ St. Mary's Women's Engg College     | Azeeza Shaik              |  |
|  Building creative web systems & exploring AI.      | B.Tech CSE • CGPA: 7.86   |  |
|                                                     | Software Engg | AI & Web  |  |
|  [Explore Projects ↓] [View Resume 📄] [GitHub]     +---------------------------+  |
|  📍 Guntur, AP  •  ✉️ shaikazeeza7386@gmail.com  •  📞 +91 7386944987             |
|                                                                                   |
+-----------------------------------------------------------------------------------+
| 01. ABOUT ME & ACADEMIC SNAPSHOT                                                  |
| +-----------------------------------------------+ +-----------------------------+ |
| | Narrative: Background, passions, C/Java/Python| | Academic Record:            | |
| | web dev, AI exploration & animation intern.   | | • B.Tech CSE: CGPA 7.86     | |
| | Strengths: Leadership, Time Management        | | • Intermediate: 81.1%       | |
| |                                               | | • Class X: 73.5%            | |
| +-----------------------------------------------+ +-----------------------------+ |
+-----------------------------------------------------------------------------------+
| 02. ORGANIZED TECHNICAL SKILLS                                                    |
| +----------------+ +----------------+ +----------------+ +---------------------+ |
| | Programming    | | Web Development| | Productivity   | | Design & Other      | |
| | • C (Basics)   | | • HTML5 & CSS3 | | • MS Word      | | • Canva             | |
| | • Java (OOP)   | | • JavaScript   | | • MS Excel     | | • Animation Workflows| |
| | • Python       | | • React / MEAN | | • PowerPoint   | | • AI Assistance     | |
| +----------------+ +----------------+ +----------------+ +---------------------+ |
+-----------------------------------------------------------------------------------+
| 03. FEATURED PROJECTS                                                             |
| +-------------------------------------------------------------------------------+ |
| | [ Image Preview ] | FoodBridge – Food Waste Management System [March 2026]   | |
| |                   | Problem: Food wastage & lack of distribution channels     | |
| |                   | Solution: Connecting donors with people in need           | |
| |                   | Tags: [Lovable] [Web Dev] [HTML] [CSS]  [GitHub Button →] | |
| +-------------------------------------------------------------------------------+ |
| | [ Image Preview ] | AI-Powered Project Risk Intelligence & Early Warning      | |
| |                   | Problem: Unexpected delays & cost overruns                | |
| |                   | Solution: AI risk prediction, health score telemetry      | |
| |                   | Tags: [AI] [React.js] [Python] [Supabase] [GitHub →]      | |
| +-------------------------------------------------------------------------------+ |
| | [ Image Preview ] | Personal Portfolio Website                                | |
| |                   | Problem: Centralized digital presence for opportunities   | |
| |                   | Solution: Modern, responsive portfolio showcase           | |
| |                   | Tags: [HTML5] [CSS3] [JavaScript] [GitHub Button →]       | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
| 04. EXPERIENCE & EDUCATION TIMELINE                                               |
|  o--- B.Tech in CSE (2024–2028) @ St. Mary's Women's Engineering College (7.86)   |
|  |                                                                                |
|  o--- Animation Intern (2 Months Duration) — Production workflows & storytelling  |
|  |                                                                                |
|  o--- Intermediate Class XI & XII (2022–2024) @ Women's Inter College (81.1%)     |
|  |                                                                                |
|  o--- Secondary School Certificate (2021–2022) @ Navabharat Municipal (73.5%)     |
+-----------------------------------------------------------------------------------+
| 05. CERTIFICATIONS & ACHIEVEMENTS                                                 |
| [Web Dev (Internshala)] [MEAN Stack (Aajhub)] [AI Skill Passport (EY & MS)]      |
| [Cyber Security (NPTEL)] [Animation Certificate] [Ideathons & Tech Fests]        |
+-----------------------------------------------------------------------------------+
| 06. CONTACT SECTION                                                               |
| +-----------------------------------------+ +-----------------------------------+ |
| | • Email: shaikazeeza7386@gmail.com [📋] | | Send a Direct Message:            | |
| | • Phone: +91 7386944987 [📞]            | | [ Name ] [ Email ]                | |
| | • Location: Guntur, Andhra Pradesh      | | [ Subject ]                       | |
| | • GitHub: shaikazeeza7386-dot           | | [ Message textarea ]              | |
| |                                         | | [ Send Message Button ]           | |
| +-----------------------------------------+ +-----------------------------------+ |
+-----------------------------------------------------------------------------------+
| © 2026 Azeeza Shaik • Built with Modern Web Standards & Responsive Design          |
+-----------------------------------------------------------------------------------+
```

---

## 3. Detailed Component Designs

### 3.1. Design Navigation Bar
- **Sticky Glassmorphic Container:** Stays docked at the top of the viewport with `backdrop-blur-md bg-[#080c14]/85 border-b border-white/5`.
- **Branding:** Left-aligned gradient avatar logo `[AS]` accompanied by "Azeeza Shaik" and subtitle "B.Tech CSE".
- **Navigation Links:** Smooth-scroll anchors for `#about`, `#skills`, `#projects`, `#timeline`, `#certifications`, `#contact` with active underline animations.
- **Action Buttons:** Direct link to GitHub (`https://github.com/shaikazeeza7386-dot`) and a high-contrast `Get in Touch` CTA.
- **Mobile Menu Drawer:** Hamburger icon button that toggles a slide-down card with touch-friendly tap targets on mobile viewports.

### 3.2. Design Homepage (Hero Section)
- **Live Status Chip:** Animated pulsing green beacon: `🟢 Seeking Internship Opportunities • B.Tech CSE (2024–2028)`.
- **Headline Hierarchy:**
  - Introductory greeting: *"Hello! I'm"*
  - Main display name with gradient fill: *"Azeeza Shaik"*
  - Subtitle: *"Computer Science & Engineering student at St. Mary's Women's Engineering College passionate about software development, creative web systems, and emerging Artificial Intelligence."*
- **Call-to-Action Group:**
  - Primary button: `Explore Projects ↓` (Gradient background with hover drop-shadow)
  - Secondary button: `View & Print Resume 📄` (Links to printable `resume.html`)
  - Tertiary button: `GitHub: shaikazeeza7386-dot`
- **Visual Profile Card:** Floating elevated card featuring avatar initials, academic CGPA badge (**7.86**), undergraduate span (2024–2028), and 1-click email copy action.

### 3.3. Design About Me Section
- **Two-Column Asymmetric Grid:**
  - **Left (60%):** Comprehensive narrative detailing academic progression at St. Mary's Women's Engineering College, programming interests (C, Java, Python, Web Dev), project motivations, and personal strengths (Leadership, Workload Resilience, Time Management).
  - **Right (40%):** Academic record card highlighting:
    - B.Tech CSE: **CGPA 7.86**
    - Intermediate: **81.1%**
    - Class X / SSC: **73.5%**
    - Personal hobbies callout (Music, Educational Dramas, Creative Web Designing).

### 3.4. Design Skills Section
- **Categorized 4-Column Grid:**
  1. **Programming Languages:** C (Basics), Java (Basics / OOP), Python (Fundamentals).
  2. **Web Development:** HTML5 & CSS3 (Skilled), JavaScript (Web Scripts), React.js & Bootstrap (Trained), MEAN Stack & SQL (Aajhub Certified).
  3. **Productivity:** Microsoft Word, Excel, PowerPoint (Ideathon Tested).
  4. **Design & Emerging AI:** Canva (Creative), Animation Workflows (2-Month Internship), AI Assistance (EY & Microsoft), Internet Research.
- **Visual Design:** Individual elevated slate cards with category icons, micro-hover border illumination, and proficiency level chips.

### 3.5. Design Project Cards
- **High-Impact Split 12-Column Layout:**
  - **Thumbnail Container (5 Cols):** High-definition visual preview with rounded-l-3xl border and smooth zoom effect on hover (`hover:scale-105`).
  - **Content Container (7 Cols):**
    - Category pill (e.g., `Community System`, `AI & Analytics`) + date tag (`March 2026`).
    - Project Title.
    - Summary description.
    - **Problem & Solution Split Callout Boxes:** Clear callouts highlighting the real-world problem and the implemented technical solution.
    - **Technology Stack Badges:** Minimalist tags displaying exact tools used.
    - **GitHub Action Link:** Direct connection to `https://github.com/shaikazeeza7386-dot`.
- **Projects Specified:**
  1. *FoodBridge – Food Waste Management System* (March 2026, Lovable & Web Dev)
  2. *AI-Powered Project Risk Intelligence & Early Warning System* (AI, React.js, Python, Supabase, PostgreSQL)
  3. *Personal Portfolio Website* (HTML5, CSS3, JavaScript, Tailwind)

### 3.6. Design Experience & Education Timeline
- **Vertical Spine Layout:** Clean left-aligned spine with glowing circular nodes corresponding to key milestones:
  1. **2024 – 2028:** B.Tech in CSE at St. Mary’s Women’s Engineering College (**CGPA: 7.86**).
  2. **2 Months Duration:** Animation Intern — Practical exposure to creative production pipelines, storytelling, and visual presentation.
  3. **2022 – 2024:** Intermediate at Women’s Intermediate College (**81.1%**).
  4. **2021 – 2022:** Secondary School Certificate at Navabharat Municipal Corp. High School (**73.5%**).

### 3.7. Design Certifications & Extracurriculars
- **3-Column Responsive Grid:**
  - **Internshala:** 8-Week Web Development Certified Training (HTML, CSS, Bootstrap, PHP, JS, React).
  - **Aajhub:** Full Stack Development (MEAN Stack – HTML, CSS, JS, SQL).
  - **EY & Microsoft:** AI Skill Passport (AI in assisting web developers).
  - **NPTEL:** Cyber Security and Privacy (Completed curriculum).
  - **Animation Internship Certificate:** 2-month training completion.
  - **Ideathons & Extracurriculars:** Competitive presentations, tech quizzes, coding contests.

### 3.8. Design Contact Section
- **Split Layout Architecture:**
  - **Direct Contact Column (Left):**
    - Email card with 1-click clipboard copy (`shaikazeeza7386@gmail.com`) and visual confirmation toast.
    - Direct phone card with one-tap dialing (`+91 7386944987`).
    - Location badge (`Guntur, Andhra Pradesh, India`).
    - GitHub repository card (`shaikazeeza7386-dot`).
  - **Interactive Contact Form (Right):**
    - Inputs for Name, Email, Subject, and Message.
    - Instant client-side validation.
    - Submit button with spinner loading feedback and direct `mailto:` fallback.

---

## 4. Finalize Responsive Layouts

| Viewport | Screen Width | Grid & Layout Adjustments |
| :--- | :--- | :--- |
| **Mobile** | `< 640px` (e.g. 375px–430px) | Single-column vertical stack (`flex-col`), full-width cards, collapsible hamburger menu drawer, compressed padding (`px-4 py-8`), touch-friendly button targets (`min-h-[44px]`). |
| **Tablet** | `640px – 1024px` (e.g. 768px) | 2-column skills grid (`grid-cols-2`), 2-column project cards, horizontal CTA button row, side-by-side contact fields. |
| **Desktop** | `> 1024px` (e.g. 1280px–1536px) | Full 12-column split project cards, 4-column skills grid, sticky header with full desktop navigation bar, max container width `max-w-6xl` centered. |

---

## 5. Verification Checklist
- [x] Wireframes created for full page flow and components.
- [x] Homepage & Hero designed with value proposition and live status.
- [x] Sticky Navigation Bar with glassmorphism and mobile drawer designed.
- [x] Project cards with problem/solution callouts and GitHub link designed.
- [x] Skills section organized into 4 logical categories.
- [x] Experience and education timeline designed with chronological nodes.
- [x] Contact section designed with direct copy cards and message form.
- [x] Responsive layout matrix finalized for Mobile, Tablet, and Desktop.

