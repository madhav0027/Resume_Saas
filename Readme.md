MiraiCV AI

TECK STACK : 

Frontend
React+vite → Full-stack React framework
Tailwind CSS → Fast UI styling

Why:

Fast development
SEO-friendly landing page
Clean UI for SaaS

Backend
Node.js → Server-side logic (API routes via React)

Why:

Same language (JavaScript) across stack
Easy API handling

AI Engine
Groq API → Resume generation

Replacing OpenAI with Groq:

Faster inference
Lower cost (good for MVP)

Database (Optional for MVP → Required later)
Postgres or MongoDB

Use for:

User data
Resume history
Subscription tracking

PDF Generation
Puppeteer

Converts HTML resume → downloadable PDF

Payments
Stripe
(Optional India support) Razorpay

Hosting & Deployment
Vercel

Architecure :

    User Input (Form)
        ↓
    React+ vite Frontend
        ↓
    API Route (Node.js)
        ↓
    Groq API (AI Resume Generation)
        ↓
    Formatted Resume (HTML Template)
        ↓
    PDF Generator (Puppeteer)
        ↓
    Download Resume


BASIC MVP:

[x] User enters:
[x] Name, experience, skills
[x] Job description (paste)
[x] Click “Generate Resume”
[] AI generates tailored resume
[] User downloads PDF