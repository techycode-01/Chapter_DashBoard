Thanks! Here's the updated **README.md** with your corrected folder structure:

---

```markdown
# JEE Main PYQs - Chapter Wise Dashboard (MathonGo Sample Task)

A responsive and interactive chapter-wise question analysis dashboard built with **Next.js**, **Tailwind CSS**, **shadcn/ui**, and **Redux Toolkit**. This project is a submission for the MathonGo Frontend Developer Sample Task, matching the provided Figma designs with pixel perfection.

---

## 🔍 Objective

Recreate the provided UI screens using the specified tech stack, ensuring:

- Pixel-perfect UI based on Figma
- Full responsiveness (mobile & desktop)
- Dark mode support
- Interactive filters, sorting, and tabs
- Integration of chapter data from JSON

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **Tailwind CSS**
- **shadcn/ui**
- **Redux Toolkit**
- **Phosphor Icons**
- **TypeScript**

---

## ✨ Features

- 🔁 **Tabs** for Physics, Chemistry, and Mathematics
- 🔍 **Filters**: Class, Units, Status, Weak Chapters (Multi-select)
- 🔃 **Sorting**: Alphabetical order toggle (A-Z / Z-A)
- 🌗 **Dark Mode Toggle** (System preference respected)
- 📘 **Chapter List** with:
  - Chapter name
  - Status
  - Year-wise question count
  - Question solved progress
- 📊 **Dynamic Stats** based on filters
- 💡 **Icons** from [Phosphor Icons](https://phosphoricons.com) randomly assigned to chapters

---

## 📁 Folder Structure

```

chapter-dashboard-master/
├── public/
│   ├── JeeMain.png        # App Icon
│   ├── globe.svg          # Optional Icons
│   └── window\.svg
├── src/
│   ├── app/
│   │   └── page.tsx       # Main entry page
│   └── lib/
│       └── chapters.json  # Mock JSON data
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── ...other config/files

````

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd chapter-dashboard-master
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

### 4. Open in browser

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧪 Mock Data Structure

```json
[
  {
    "subject": "Physics",
    "chapter": "Mathematics in Physics",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "status": "Not Started",
    "questionSolved": 10,
    "isWeakChapter": true,
    "yearWiseQuestionCount": {
      "2025": 5,
      "2024": 2
    }
  }
]
```

---

## 🔄 Filters & Behavior

* Filters update chapter list in real-time
* "Weak Chapters" filters only weak-marked chapters
* "Not Started" filters by `status`
* Class and Unit filters are dynamically generated and multi-select
* Sorting toggle supports A-Z / Z-A
* Icons and indicators (like green/red arrows) reflect performance

---

## 📦 Deployment

The app is deployed on **Vercel**:

🔗 **Live Demo**: [https://chapter-dash-board.vercel.app/](https://chapter-dash-board.vercel.app/)
📁 **GitHub Repo**: [https://github.com/your-username/your-repo-name](https://github.com/your-username/your-repo-name)

```

Let me know if you'd like to auto-generate a fancy README with a banner image, badges, or markdown GIFs for the UI preview.
```
