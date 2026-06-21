# Safargo File Manifest

This project was generated as real source files in the workspace. For each entry, the complete code is in the exact file path listed.

| # | Exact file path | Purpose | Dependencies required | Exports | Dependents | Next file |
|---:|---|---|---|---|---|---|
| 1 | `README.md` | Project overview, stack, and local startup commands. | Markdown reader | None | Contributors, operators | `LICENSE` |
| 2 | `LICENSE` | MIT license terms. | None | None | Repository users | `CONTRIBUTING.md` |
| 3 | `CONTRIBUTING.md` | Contribution workflow and quality rules. | None | None | Contributors | `docker-compose.yml` |
| 4 | `docker-compose.yml` | Local PostgreSQL, Redis, backend, and frontend orchestration. | Docker Compose | Services | Developers | `backend/package.json` |
| 5 | `backend/package.json` | Backend dependencies and scripts. | Node.js, npm | npm scripts | CI, Docker | `backend/tsconfig.json` |
| 6 | `backend/prisma/schema.prisma` | Database schema for users, trips, bookings, notifications, analytics, and AI chat. | Prisma, PostgreSQL | Prisma Client models | Backend repositories | `backend/src/app.ts` |
| 7 | `backend/src/app.ts` | Express application composition. | Express middleware and routes | `createApp` | `server.ts`, tests | `backend/src/server.ts` |
| 8 | `backend/src/routes/index.ts` | API router aggregator. | Express routers | `apiRouter` | `app.ts` | backend modules |
| 9 | `backend/src/modules/auth/**` | Authentication module with JWT, bcrypt, refresh-token rotation, validation, and routes. | Express, Joi, Prisma, bcrypt, JWT | Auth controller/service/routes/types | API router, frontend auth service | users module |
| 10 | `backend/src/modules/users/**` | User profile and admin user listing module. | Express, Joi, Prisma | User controller/service/routes/types | API router, frontend profile | trips module |
| 11 | `backend/src/modules/trips/**` | Trip CRUD and travel history module. | Express, Joi, Prisma | Trip controller/service/routes/types | API router, frontend trips | bookings module |
| 12 | `backend/src/modules/bookings/**` | Booking CRUD and spend tracking module. | Express, Joi, Prisma | Booking controller/service/routes/types | API router, analytics | notifications module |
| 13 | `backend/src/modules/notifications/**` | Notification list, create, and read-state module. | Express, Joi, Prisma | Notification controller/service/routes/types | API router, frontend notifications | analytics module |
| 14 | `backend/src/modules/analytics/**` | Analytics event tracking and dashboard overview module. | Express, Joi, Prisma | Analytics controller/service/routes/types | API router, dashboard | AI module |
| 15 | `backend/src/modules/ai/**` | Itinerary, recommendations, budget, packing list, and chat assistant with AI providers and Redis cache. | OpenAI, Axios, Redis, Prisma | AI controller/service/routes/types | API router, frontend AI services | frontend package |
| 16 | `frontend/package.json` | Frontend dependencies and scripts. | Node.js, npm | npm scripts | CI, Docker | `frontend/src/main.tsx` |
| 17 | `frontend/src/main.tsx` | React entrypoint with Redux, router, and theme providers. | React, Redux, Router | React root render | Vite | `frontend/src/App.tsx` |
| 18 | `frontend/src/routes/AppRoutes.tsx` | Public and authenticated route tree. | React Router | `AppRoutes` | `App.tsx` | layout/components |
| 19 | `frontend/src/components/**` | Shared controls, layout, cards, charts, and trip form. | React, Tailwind, Lucide, Recharts | UI components | Pages | pages |
| 20 | `frontend/src/pages/**` | Landing, auth, dashboard, trip planner, budget, recommendations, chatbot, profile, and admin screens. | React, Redux, services | Page components | Router | services/store |
| 21 | `frontend/src/services/**` | Axios API clients for auth, users, trips, AI, analytics, and notifications. | Axios | Service objects | Store and pages | store |
| 22 | `frontend/src/store/**` | Redux Toolkit store and slices. | Redux Toolkit | `store`, slices, thunks | Providers, pages | infrastructure |
| 23 | `infrastructure/kubernetes/**` | Kubernetes namespace, workloads, services, ingress, config, and secret example. | Kubernetes | YAML manifests | Operators | Terraform |
| 24 | `infrastructure/terraform/**` | Terraform resources for Kubernetes namespace, config, and generated secrets. | Terraform, Kubernetes provider | Terraform outputs | Operators | GitHub Actions |
| 25 | `.github/workflows/ci.yml` | Backend and frontend CI checks. | GitHub Actions | CI workflow | Repository | docs |

## Complete Code

All code is stored directly in the generated files above. Use `rg --files Safargo` from the workspace root to list every concrete file.
