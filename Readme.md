#  MiraiCV AI — Resume Builder SaaS

MiraiCV AI is an AI-powered resume builder that generates ATS-friendly resumes, provides optimization suggestions, and recommends jobs based on user profiles.

Built with a modern full-stack JavaScript architecture for speed, scalability, and clean UI.

---

##  Features

*  AI Resume Generation (via Groq API)
*  ATS Score Analysis & Optimization Suggestions
*  Smart Resume Editing & Improvements
*  Upload Resume → Convert to ATS-Friendly Template
*  AI Job Recommendations (based on resume content)
*  Export Resume as PDF
*  Fast, minimal, SaaS-ready UI

---

##  Tech Stack

### Frontend

* React + Vite
* Tailwind CSS

**Why:**

* Fast development & build times
* Clean and responsive UI
* SEO-friendly landing pages

### Backend

* Node.js + Express

**Why:**

* Same language across stack (JavaScript)
* Simple and scalable API handling

### AI Engine

* Groq API

**Why Groq over OpenAI:**

* Faster inference
* Lower cost (ideal for MVP)

### Database (Planned)

* PostgreSQL or MongoDB

**Use Cases:**

* User data
* Resume history
* Subscription tracking

### PDF Generation

* Puppeteer

**Use:**

* Convert HTML resumes → downloadable PDFs

### Deployment

* Vercel (Frontend + API)

---

## Architecture

```
User Input (Form)
        ↓
React + Vite Frontend
        ↓
Node.js API (Express)
        ↓
Groq API (AI Processing)
        ↓
Resume HTML Template
        ↓
Puppeteer (PDF Generation)
        ↓
Download Resume
```

---

## AI Capabilities

* Resume generation from scratch
* ATS score calculation
* Skill gap analysis
* Resume improvement suggestions
* Resume rewriting (better wording & structure)
* Job recommendations based on profile
* Resume parsing (upload existing resume → structured data)

---

## 📦 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/miraicv-ai.git
cd miraicv-ai
```

---

### 2. Frontend Setup (React + Vite)

```bash
cd frontend/resume-wizard-pro
npm install
npm run dev
```

**Build for production:**

```bash
npm run build
```

---

### 3. Backend Setup (Node.js + Express)

```bash
cd backend
npm install
npm run start
```

---

## ⚙️ Environment Variables

Create a `.env` file in the server folder:

```env
GROQ_API_KEY=your_groq_api_key
PORT=5000
MONGO_URI=your_database
EMAIL_USER=emailforsmtp
EMAIL_PASS=generated_passwords
JWT_ACCESS_SECRET=MAKESECRETTOKENS
JWT_REFRESH_SECRET=MAKEREFRESHTOKENS
CLIENT_URL=
SERVER_URL=
```

(Optional future)

```env
DATABASE_URL=your_database_url
STRIPE_KEY=your_stripe_key
```

---

## 📁 Project Structure

```
miraicv-ai/
│
├── frontend/resume-wizard-pro        # React + Vite frontend
├── backend/        # Node.js backend (Express)
├── └── README.md
```

---

## Scripts

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend

```bash
npm run start    # Start server
npm run dev      # Start with nodemon (if configured)
```

---

## Important Notes

* Payments are **not implemented yet**
* Database is optional for MVP (currently stateless)
* Groq API is used for all AI features
* Ensure Puppeteer works properly in your deployment environment

---

## Future Improvements

* Multi-language resume support
* AI interview preparation
* LinkedIn profile import
* Resume sharing via public link
* Real-time ATS feedback

---

##  Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.


---

## Author

Madhav Pathak
GitHub: [https://github.com/your-username](https://github.com/madhav0027)

---
