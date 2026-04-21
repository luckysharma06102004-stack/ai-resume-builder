# Resume Builder — Client

The frontend of the AI-powered Resume Builder, built with React + Vite.

## Tech Stack

- **React 18** — UI library
- **Vite** — Fast dev server and bundler
- **Tailwind CSS** — Utility-first styling
- **Redux Toolkit** — Auth state management
- **React Router DOM** — Client-side routing
- **Lucide React** — Icons
- **React Hot Toast** — Notifications
- **Axios** — HTTP requests

## Features

- Build resumes with a multi-step form (Personal Info, Summary, Experience, Education, Projects, Skills)
- AI-powered professional summary and job description enhancer
- Resume Health & ATS Scorer — one-click deep analysis
- 4 professional templates with custom accent colors
- Import existing resume via text — AI auto-populates all fields
- Live resume preview as you type
- Download resume as PDF
- Toggle public/private visibility and share via link

## Project Structure

```
client/
├── public/                  # Static assets (logo, favicon)
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   └── authSlice.js         # Redux auth slice
│   │   └── store.js                 # Redux store
│   ├── assets/
│   │   ├── assets.js                # Dummy data and static exports
│   │   └── templates/               # Template JSX components (duplicate set)
│   ├── components/
│   │   ├── home/                    # Landing page sections
│   │   │   ├── Banner.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   ├── CallToAction.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Title.jsx
│   │   ├── templates/               # Resume template renderers
│   │   │   ├── ClassicTemplate.jsx
│   │   │   ├── ModernTemplate.jsx
│   │   │   ├── MinimalTemplate.jsx
│   │   │   └── MinimalImageTemplate.jsx
│   │   ├── ATSScoreChecker.jsx      # Resume analyzer panel
│   │   ├── ColorPicker.jsx
│   │   ├── EducationForm.jsx
│   │   ├── ExperienceForm.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── PersonalInfoForm.jsx
│   │   ├── ProfessionalSummaryForm.jsx
│   │   ├── ProjectForm.jsx
│   │   ├── ResumePreview.jsx
│   │   ├── SkillsForm.jsx
│   │   └── TemplateSelector.jsx
│   ├── configs/
│   │   └── api.js                   # Axios base URL config
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.jsx
│   │   ├── Preview.jsx
│   │   └── ResumeBuilder.jsx
│   ├── App.jsx                      # Routes definition
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- Backend server running (see `/server` README)

### Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the `client/` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Run Development Server

```bash
npm run dev
```

Runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output goes to `dist/`

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page |
| `/app` | Dashboard | View all resumes |
| `/app/resume/:id` | ResumeBuilder | Edit a resume |
| `/app/preview/:id` | Preview | Full-screen preview |
| `/view/:id` | Preview (public) | Public shareable view |

## Key Components

### `ATSScoreChecker`
Placed inside the ResumeBuilder left panel. On click, sends the current resume data to `/api/ai/analyze-resume` and returns:
- ATS Score + Health Score (0–100)
- Completeness check per section
- Content quality (action verbs, quantified results)
- Industry keyword suggestions based on job title
- Readability and formatting check
- Priority fixes ordered by impact

### `ResumePreview`
Renders the live resume using the selected template component and accent color. Updates in real time as the user fills the form.

### `TemplateSelector` + `ColorPicker`
Allow switching between templates and customizing the accent color, both reflected instantly in the preview.