
# 🏦 Loan Management System

A full-stack loan management system built with **Flask**, **SQLite**, **React**, **Vite**, and **Tailwind CSS**.

---

## 🔧 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS  
- **Backend:** Flask + SQLite  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Loan-Management
```

You will see two directories:

- `frontend/` — React-based UI
- `backend/` — Flask backend API

---

### 2. Start the Backend

```bash
cd backend
```

#### Activate the virtual environment

```bash
source venv/bin/activate
```

> 📝 Example terminal output:

```
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5001
```

---

### 3. Start the Frontend

```bash
cd ../frontend
npm install
```

#### Configure API URL

Open:

```
src/services/api.ts
```

Update the line:

```ts
const API_URL = "http://127.0.0.1:5001/api";
```

#### Run the React app

```bash
npm run dev -- --host
```

> 📝 Example terminal output:

```
> frontend@0.0.0 dev
> vite --host

Port 5173 is in use, trying another one...
Port 5174 is in use, trying another one...

  VITE v6.3.5  ready in 315 ms

  ➜  Local:   http://localhost:5175/
  ➜  Network: http://192.168.1.7:5175/
```

---

## 📡 API Endpoints

| Endpoint                        | Method | Description                 |
|--------------------------------|--------|-----------------------------|
| `/api/users`                   | POST   | Create new user *(All fields mandatory and unique)* |
| `/api/loans`                   | POST   | Create new loan             |
| `/api/loans/{loan_id}/ledger` | GET    | Get loan ledger             |
| `/api/loans/{loan_id}/csv`    | GET    | Download ledger as CSV      |

---


