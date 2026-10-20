# ProcureX QE Platform Instructions

## Project context

ProcureX QE Platform is a learning and portfolio project for a realistic supplier registration application and maintainable automated testing. The goal is to demonstrate modern Quality Engineering skills through incremental, explainable engineering decisions.

Current repository structure and stack:

- Root Playwright Test suite uses TypeScript, configured by `playwright.config.ts`; tests are under `tests/` and supporting code under `src/` (`pages/`, `utils/`, `api/`, and `fixtures/`).
- The frontend is a React and TypeScript application built with Vite in `app/`.
- The backend is an Express and TypeScript API in `api/`, with PostgreSQL access through `pg` and validation using Zod.
- `docs/test-strategy.md` describes planned testing practices. GitHub Actions workflows are planned; add them only when that phase is requested.

## Automation architecture

- Keep UI locators and reusable page interactions in focused Page Object Model classes. Keep scenario intent and meaningful assertions in test specifications.
- Add Playwright fixtures when shared setup or dependency management justifies them; centralize test data and configuration when reuse warrants it.
- Build UI and API coverage incrementally, including positive, negative, boundary, and regression scenarios as appropriate. Add API helpers, isolation, reporting, tracing, and CI when they solve a current need.
- Prefer accessible Playwright locators such as roles and labels, plus robust assertions. Avoid brittle selectors, arbitrary sleeps, and implementation-dependent details.
- Keep abstractions focused; avoid duplicated logic, oversized page objects, and unnecessary layers.
- Do not introduce BDD, Cucumber, or Gherkin unless explicitly requested.

## Engineering and safety rules

- Use TypeScript types and clear, descriptive names. Follow existing conventions and inspect relevant files before proposing or making changes; do not assume a planned file or feature already exists.
- Do not change application or API behavior during a test-only task.
- Never hardcode secrets or expose real credentials, personal data, or database connection strings. Never perform destructive database operations without explicit approval.
- Do not overwrite unrelated user changes. Implement only the current requested scope; do not build future phases automatically.
- Before substantial edits, briefly explain the objective, proposed change, and affected files. Make the smallest suitable change.
- After changes, run relevant tests, type checks, or builds when possible. Report what was run and its actual result; never claim verification that was not performed.
- Briefly explain important design choices so the project owner can understand and discuss them in interviews.
