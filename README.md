# Safargo

Safargo is an AI-powered travel planning platform for secure trip management, AI itineraries, budget optimization, packing lists, destination recommendations, analytics, notifications, and a conversational travel assistant.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Redux Toolkit, React Router, Axios, React Hook Form, Recharts
- Backend: Node.js, Express, TypeScript, PostgreSQL, Prisma, Redis, JWT, bcrypt, Winston, Swagger, Joi
- AI: OpenAI API, Google Gemini API with resilient local fallback responses when keys are not configured
- DevOps: Docker, Docker Compose, Kubernetes, Terraform, Nginx, GitHub Actions

## Quick Start

```bash
cd Safargo
npm install
npm --prefix backend run prisma:generate
docker compose up --build
```

The frontend runs at `http://localhost:5173`, the API at `http://localhost:8080`, and Swagger docs at `http://localhost:8080/api-docs`.

## Local Development

```bash
cd Safargo/backend
cp .env.example .env
npm install
npm run prisma:migrate
npm run dev

cd ../frontend
npm install
npm run dev
```

## Security Notes

- Use strong production values for JWT secrets.
- Set `OPENAI_API_KEY` and/or `GEMINI_API_KEY` in a private environment manager.
- Keep `.env` files out of version control.
- Run migrations before deploying the backend.

## Useful Commands

```bash
npm test
npm run build
npm --prefix backend run prisma:studio
```
