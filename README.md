<div align="center">

<br />

# 📄 AI Resume Builder

### Build ATS-Optimized Resumes with the Power of AI

Craft job-winning resumes in minutes — with real-time preview, AI-powered content suggestions, ATS score analysis, and one-click PDF export.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-AI_Resume_Builder-10B981?style=for-the-badge)](https://whimsical-kringle-a42968.netlify.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/)

</div>

---

## ✨ Overview

**AI Resume Builder** is a full-stack intelligent resume platform that combines dynamic templates, real-time preview, and deep OpenAI integration to help users craft professional, job-description-optimized resumes — complete with ATS scoring and keyword analysis.

Built with **React**, **Node.js**, **Express.js**, and **MongoDB**, the platform offers a seamless experience from building to exporting, backed by **9 REST API endpoints**, **JWT authentication**, and **ImageKit CDN** for optimized media delivery.

> 💡 From blank page to job-ready resume in under 5 minutes — powered by AI.

---

## 🌐 Live Demo

🔗 **[https://whimsical-kringle-a42968.netlify.app/](https://whimsical-kringle-a42968.netlify.app/)**

---

## 🎯 Key Features

### 🎨 Resume Builder
- **4 Dynamic Templates** — switch between professionally designed layouts with live preview
- **Customizable Accent Colors** — personalize your resume's visual identity
- **Real-Time Preview** — see every change reflected instantly as you type
- **One-Click PDF Export** — download a pixel-perfect PDF of your resume

### 🤖 AI-Powered (OpenAI API)
- **Professional Summary Enhancement** — AI rewrites your summary to sound polished and impactful
- **Job Description Optimization** — tailors your resume content to match a specific JD
- **ATS Score Analysis** — analyzes keyword alignment and gives an ATS compatibility score
- **Keyword Suggestions** — surfaces missing keywords to boost your resume's pass rate
- **Raw Text Extraction** — parses unstructured resume content into structured sections automatically
- **AI Resume Import** — paste raw text and AI auto-populates all resume sections via JSON extraction

### 🔒 Auth & Data
- **JWT Authentication** — secure login and session management
- **bcrypt Password Hashing** — passwords never stored in plain text
- **Protected Resume Management** — each user's resumes are private and persistent

### 🌐 Sharing & Media
- **Public Shareable Resume Links** — share your resume with a unique URL
- **ImageKit CDN Integration** — optimized media delivery and faster asset loading

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, HTML, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **AI** | OpenAI API (GPT) |
| **Auth** | JWT, bcrypt |
| **Media CDN** | ImageKit |
| **Frontend Deploy** | Netlify |
| **Backend Deploy** | Render |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        React Frontend                        │
│   Template Selector │ Live Preview │ AI Trigger Buttons     │
└────────────────────────────┬─────────────────────────────────┘
                             │ REST API (9 endpoints)
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                   Node.js + Express Backend                  │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐   │
│  │ Auth Layer │  │ Resume API │  │   OpenAI Proxy       │   │
│  │ JWT/bcrypt │  │ CRUD (9ep) │  │  (7 AI features)     │   │
│  └────────────┘  └─────┬──────┘  └──────────┬───────────┘   │
│                        │                    │               │
│               ┌────────▼───────┐   ┌────────▼───────┐      │
│               │    MongoDB     │   │   OpenAI API   │      │
│               │  (Resumes,     │   │   (GPT model)  │      │
│               │   Users)       │   └────────────────┘      │
│               └────────────────┘                           │
└──────────────────────────────────────────────────────────────┘
                             │
                             ▼
                    ImageKit CDN (Media)
```

---

## 📁 Project Structure

```
ai-resume-builder/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeEditor/        # Section-wise form components
│   │   │   ├── TemplatePreview/     # 4 dynamic resume templates
│   │   │   ├── AIAssistant/         # AI suggestion UI panels
│   │   │   └── Auth/                # Login / Signup forms
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # User resume list
│   │   │   ├── Builder.jsx          # Main builder page
│   │   │   └── Public.jsx           # Shareable resume view
│   │   └── utils/
│   │       └── api.js               # Axios API client
│   └── public/
│
├── server/                          # Node.js + Express Backend
│   ├── routes/
│   │   ├── auth.js                  # POST /register, POST /login
│   │   ├── resume.js                # 9 REST endpoints for resume CRUD
│   │   └── ai.js                    # OpenAI API proxy routes
│   ├── models/
│   │   ├── User.js                  # Mongoose User schema
│   │   └── Resume.js                # Mongoose Resume schema
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verification
│   └── index.js                     # Express entry point
│
└── README.md
```

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |

### Resume CRUD Routes _(JWT Protected)_
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/resumes` | Get all resumes for current user |
| `POST` | `/api/resumes` | Create a new resume |
| `GET` | `/api/resumes/:id` | Get a specific resume |
| `PUT` | `/api/resumes/:id` | Update a resume |
| `DELETE` | `/api/resumes/:id` | Delete a resume |
| `GET` | `/api/resumes/public/:shareId` | Get a public shareable resume |

### AI Routes _(JWT Protected)_
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ai/enhance-summary` | AI-enhance professional summary |
| `POST` | `/api/ai/optimize-jd` | Optimize resume for a job description |
| `POST` | `/api/ai/ats-score` | Analyze ATS score & suggest keywords |
| `POST` | `/api/ai/extract-text` | Extract sections from raw resume text |
| `POST` | `/api/ai/import-resume` | Auto-import resume from raw text via JSON |

> _Total: 9 core REST endpoints + AI-specific routes_

---

## 🤖 AI Features — Deep Dive

The platform integrates **OpenAI API** across **7 resume sections**, making it one of the most comprehensive AI resume tools available:

```
Resume Section          AI Capability
─────────────────────────────────────────────────────────────
Professional Summary  → Rewrite & enhance for impact
Work Experience       → Bullet point optimization per JD
Skills Section        → ATS keyword gap analysis
Education             → Formatting & relevance suggestions
Projects              → Action-verb enrichment
Certifications        → Role-relevance scoring
Full Resume           → ATS score (0–100) + keyword report
                        Raw text → structured JSON extraction
                        Paste-to-import auto population
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **OpenAI API Key** — [Get one here](https://platform.openai.com/api-keys)
- **ImageKit Account** — [Sign up free](https://imagekit.io/)

### 1. Clone the Repository

```bash
git clone https://github.com/luckysharma06102004-stack/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 3. Configure Environment Variables

**Server — `server/.env`**
```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Server
PORT=5000
```

**Client — `client/.env`**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Run the Application

```bash
# Start the backend server (from /server)
npm run dev

# Start the React frontend (from /client)
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment

### Frontend → Netlify

```bash
cd client
npm run build
# Deploy the /build folder to Netlify
```

Or connect your GitHub repo to Netlify for automatic deployments on push.

### Backend → Render

1. Push the `server/` directory to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set the environment variables in Render's dashboard
4. Render auto-deploys on every push to `main`

---


## 🔮 Roadmap

- [ ] 🌐 **LinkedIn profile import** — auto-fill resume from LinkedIn URL
- [ ] 🎨 **More templates** — 10+ professional designs
- [ ] 📧 **Cover letter generator** — AI-crafted cover letters per JD
- [ ] 📊 **Analytics dashboard** — track resume views and link clicks
- [ ] 🌍 **Multi-language resumes** — generate resumes in different languages
- [ ] 🤝 **Team / recruiter view** — share and review candidate resumes

---

## 🔐 Security

- All passwords hashed with **bcrypt** (salt rounds: 10)
- All protected routes require a valid **JWT Bearer token**
- OpenAI API key is **never exposed to the frontend** — all AI calls go through the Express backend proxy
- Environment variables managed via `.env` files — never committed to version control

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature-name`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👨‍💻 Author

**Lucky Sharma**

> B.Tech Computer Science Engineering @ KIIT University, Bhubaneswar
> Full Stack Developer | AI/ML Enthusiast

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucky-sharma-7a7792336/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/luckysharma06102004-stack)
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:luckysharma06102004@gmail.com)

---


<div align="center">

Made with ❤️ by Lucky Sharma

⭐ **If this project helped you land a job, give it a star!**

</div>
