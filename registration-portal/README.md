# Registration Portal

## Run the backend

From the `backend` directory, install the Python dependencies and start FastAPI:

```powershell
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

The API listens on `http://localhost:8000`; registration is handled by `POST /api/register`.

## Run the frontend

From the project root, install the Node dependencies and start Vite:

```powershell
npm install
npm run dev
```

The frontend defaults to `http://localhost:8000/api`. Set `VITE_API_URL` to override that API base URL; it should include `/api` (for example, `http://localhost:8000/api`).
