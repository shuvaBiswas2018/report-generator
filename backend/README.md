# Backend — Report Generator

This directory contains the Python backend for the Report Generator application (FastAPI).

## Overview

The backend exposes endpoints for user authentication, report generation (PDF, DOCX, PPTX), and distribution of generated files.

## Prerequisites

- Python 3.8+
- `venv` or other virtual environment tooling
- PostgreSQL (or a database compatible with the `DATABASE_URL` connection string)

## Installation

1. Change into the backend folder:

```bash
cd backend
```

2. Create and activate a virtual environment:

macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Windows (PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file (see Environment variables) or ensure environment variables are set.

## Environment variables

Create a `.env` in `backend/` with at least the following values (examples):

- `DATABASE_URL` — Postgres connection string (e.g. `postgresql://user:pass@localhost:5432/dbname`)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` — for Google OAuth (if used)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — for sending emails (passwords should be kept secret)

> Note: Sensitive values should never be committed to the repository. Use a secrets manager or environment variables in CI/deployment.

## Run the server (development)

The FastAPI application entrypoint is `main.py`.

Run with Uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

This will start the API at `http://localhost:8000`.

## Important endpoints (examples)

- `POST /download-report/{format}` — generate and download a report (`pdf`, `docx`, `pptx`)
- `POST /auth/signup` — user signup
- `POST /auth/login` — user login
- `POST /auth/forgot-password` — request password reset
- `POST /auth/reset-password` — reset password with token

## Reports

Generated reports are stored in the `backend/reports/` folder by default.

## Testing

There are no automated tests included by default. Add unit/integration tests (e.g., pytest) and document test commands here when added.

## Troubleshooting

- If the server fails to connect to the database, double-check `DATABASE_URL` and database availability.
- If email fails, verify SMTP configuration and credentials.

## Contributing

Please open issues or PRs for improvements, and avoid committing secrets.

## License

No license is specified. Add a `LICENSE` file to make the project public under a permissive license (e.g., MIT) if desired.
