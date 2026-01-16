# 📚 Articles Management System with Authentication (Next.js using app router)
Base Dashboard built with Next.js + React + TypeScript + TailwindCSS with full Arabic and English support.
The application must use Zustand as the single source of truth for state management.

__Main modules:__ <br />
1. 🔐 Authentication <br />
2. 📊 Dashboard (Articles, Stats, Working Hours, Settings) <br />
3. 🌐 Multi-language (EN/AR with RTL) <br />
4. 🌙 Dark Mode toggle (Light/Dark theme) <br />

## 🛠️ Technologies Used
### **Frontend(Nextjs)**
- ⚛️ Next/React, next-intl(For localization)
- 🎨 TailwindCss with MUI(In some section)
- 🗃️ Zustand(For manage the global state with persist)
- 📄 React-pdf(For export the post as PDF)
- ✨ Framer-motion(Create a smooth animation)
### **Backend** 
- 🗄️ I use the Zustand with presist to create a local database system and authentication.

## 🚀 Installation Guide

### Clone the repository
```bash
  git clone https://github.com/A-sleh/Articles-managment-system.git
  cd /Articles-managment-system
```

### Then run the project
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## 2. Functional Requirements
  ### 2.1 Authentication <br />
    ● Simple login (mock, stored in Zustand). 
    ● Redirect to Dashboard after login. 
  ### 2.2 Language Support <br />
    ● English + Arabic support (RTL for AR). 
    ● Language toggle in top bar. 
  ### 2.3 Dark Mode Support <br />
    ● Global light/dark mode toggle in top bar. 
    ● Persist choice in Zustand. 
    ● All components styled with Tailwind dark mode classes. 
  ### 2.4 Dashboard Layout <br />
    ● Sidebar navigation: 
      ○ Articles 
      ○ Stats 
      ○ Working Hours 
      ○ Settings 
    ● Top bar: 
      ○ Language switcher 
      ○ Dark mode toggle 
      ○ User avatar 
  ### 2.5 Articles Page <br />
    ● CRUD articles stored in Zustand store.
    ● Article Form must include:
      ○ Title (text)
      ○ Category (select/dropdown)
      ○ Tags (multi-select, comma-separated input)
      ○ Cover Image
      ○ Rich text content (CKEditor)
      ○ Published status (toggle switch)
      ○ Scheduled publish date (date picker)
    ● Articles list:
      ○ Reorder with drag-and-drop (@dnd-kit/sortable).
      ○ Show article metadata (title, category, status, date).
    ● Export single article as PDF.
  ### 2.6 Stats Page <br />
    ● Charts (react-apexcharts):
      ○ Articles per category
      ○ Mock views per day
    ● Date range filter (react-datepicker).
  ### 2.7 Working Hours Page <br />
    ● Weekly schedule view (Sun–Sat).
    ● Each row = one day with multiple time ranges (start–end).
    ● Features:
      ○ Add new time range (+ button)
      ○ Delete time range (trash button)
      ○ Copy time range (duplicate button)
    ● Conflict Detection Logic:
      ○ Overlapping times in the same day trigger a red warning.
      ○ Save button disabled if conflicts exist.
    ● Change Detection Logic:
      ○ If user edits but hasn’t saved, show banner:
      ■ “Unsaved changes” with actions: ✅ Save | ❌ Discard
    ● Data stored in Zustand store.
  ### 2.8 Settings Page <br />
    ● User profile (mock).
    ● Change default language.
    ● Change default theme (light/dark).
  ### 2.9 Bonus Features <br />
    ● Export all articles → Excel.
    ● Share article → social media.
    ● Guided tour → onboarding.
    ● Offline-ready → PWA.

## 3. Non-Functional Requirements <br />
    ● Entire app state in Zustand (articles, schedule, auth, language, theme).
    ● Modular TypeScript code with proper interfaces.
    ● Responsive TailwindCSS design.
    ● RTL support for Arabic.
    ● Dark mode styled with Tailwind (dark: classes).

