# Contributing

## Workflow

1. Create a feature branch from `main`.
2. Install dependencies in `backend` and `frontend`.
3. Run tests and type checks before opening a pull request.
4. Keep changes focused and include tests for behavioral changes.

## Quality Bar

- Keep TypeScript strict and avoid implicit `any`.
- Validate all request bodies, params, and query strings.
- Never commit secrets.
- Prefer small services and repositories over large controllers.
- Document meaningful API or infrastructure changes in `docs/`.
