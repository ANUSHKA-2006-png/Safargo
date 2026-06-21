# Safargo Architecture

Safargo is a modular monorepo with a TypeScript Express API, a TypeScript React SPA, and deployment assets for containerized and Kubernetes environments.

## Backend

The backend uses route-controller-service-repository layering per domain module. Controllers only translate HTTP input/output. Services own business rules. Repositories isolate Prisma persistence. Shared middleware handles authentication, authorization, validation, rate limiting, logging, and errors.

## AI Flow

AI requests enter the `ai` module, are validated with Joi, checked against Redis cache, and then executed through OpenAI. If OpenAI is unavailable, Gemini is attempted. If external providers are not configured or fail, Safargo returns deterministic local travel intelligence so the application remains usable in development and degraded production modes.

## Frontend

The frontend uses React Router for page routing, Redux Toolkit for auth and trips, Axios for API calls, React Hook Form for forms, Tailwind CSS for styling, and Recharts for analytics.

## Deployment

Docker Compose supports local full-stack development. Kubernetes manifests cover core workloads and ingress. Terraform provisions Kubernetes namespace, configuration, and application secrets against an existing cluster context.
