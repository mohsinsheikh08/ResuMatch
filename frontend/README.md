# 🤖 ResuMatch — AI Resume Analyzer

An AI-powered full-stack web app that analyzes your resume against a job description and generates a comprehensive interview preparation report.

![ResuMatch Banner](./screenshots/banner.png)

## ✨ Features

- 📊 **Match Score** — Weighted scoring (skills 35%, experience 25%, achievements 20%, education 10%, domain 10%)
- 💻 **Technical Questions** — 5–7 domain-specific questions with intentions & model answers
- 🎯 **Behavioral Questions** — STAR-format questions with model answers
- 📉 **Skill Gaps** — Identifies missing skills with severity levels (low / medium / high)
- 📅 **7-Day Preparation Plan** — Day-wise focus areas and tasks
- 📄 **PDF Resume Upload** — Auto-extracts text using `pdf-parse`
- 🔐 **JWT Authentication** — Secure login/register with token blacklist on logout
- 🌗 **Responsive UI** — Mobile-first design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Context API** (state management)
- **Axios**
- **Lucide Icons**

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT** (authentication)
- **bcrypt** (password hashing)
- **Multer** (file upload)
- **pdf-parse** (PDF text extraction)
- **cookie-parser** + **CORS**

### AI
- **Google Gemini API** (`gemini-3.6-flash`)
- **Zod** (schema validation for AI output)

### Deployment
- **Vercel** (frontend)
- **Render / Railway** (backend) — _update after deploy_

## 🚀 Live Demo

🔗 [Live Site](https://your-app.vercel.app)  
🎥 [Demo Video](https://your-demo-link.com) — _optional_

## 📸 Screenshots

### Login Page
![Login](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Analysis Report
![Report](./screenshots/report.png)

## ⚙️ Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API Key → [Get one here](https://aistudio.google.com/app/apikey)

### 1. Clone the Repository
```bash
git clone https://github.com/mohsinsheikh08/ResuMatch.git
cd ResuMatch