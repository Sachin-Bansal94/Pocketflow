# 💸 PocketFlow

> A full-stack expense tracking web app to manage income, expenses, and financial insights — with authentication, analytics, and cloud deployment.

[![Live Demo](https://img.shields.io/badge/Frontend-Live%20Demo-brightgreen?style=for-the-badge)](https://pocketflow-9rbs.vercel.app/)
[![API](https://img.shields.io/badge/Backend-API-blue?style=for-the-badge)](https://pocketflow-5nux.onrender.com)
[![GitHub Stars](https://img.shields.io/github/stars/Sachin-Bansal94/Pocketflow?style=for-the-badge)](https://github.com/Sachin-Bansal94/Pocketflow)

---

## ✨ Features

- 🔐 **User Authentication** — Secure register/login with bcrypt password hashing
- 💰 **Transaction Management** — Add and delete income & expense entries
- 📊 **Analytics Dashboard** — Visual income vs. expense insights
- 📅 **Date-wise Filtering** — Browse transactions by date range
- 📂 **Category Tracking** — Organize spending by category
- ☁️ **Cloud-Ready** — Fully deployed with Vercel, Render, and Neon DB

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js, Ant Design, Axios, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Neon DB) |
| **Deployment** | Vercel (frontend), Render (backend), Neon (DB) |

---

## 🗄 Database Schema

### Users Table

| Column | Type |
|--------|------|
| `id` | SERIAL PRIMARY KEY |
| `username` | VARCHAR |
| `email` | VARCHAR UNIQUE |
| `password` | TEXT (hashed) |

### Transactions Table

| Column | Type |
|--------|------|
| `transaction_id` | SERIAL PRIMARY KEY |
| `amount` | NUMERIC |
| `type` | VARCHAR (`income` / `expense`) |
| `category` | VARCHAR |
| `reference` | VARCHAR |
| `description` | TEXT |
| `dateexpense` | DATE |
| `useremail` | VARCHAR |

---

## 🌍 Deployment Architecture

```
User Browser
    ↓
Vercel (React Frontend)
    ↓
Render (Express REST API)
    ↓
Neon (PostgreSQL Database)
```

---

## ⚙️ Local Setup

### Prerequisites

- Node.js v18+
- A [Neon](https://neon.tech) account with a PostgreSQL database

---

### 1. Clone the Repository

```bash
git clone https://github.com/Sachin-Bansal94/Pocketflow.git
cd Pocketflow
```

### 2. Backend Setup

```bash
npm install
```

Create a `.env` file in the root directory:

```env
PORT=8080
DATABASE_URL=your_neon_database_url
```

Start the server:

```bash
node server.js
```

Backend runs at: `http://localhost:8080`

---

### 3. Frontend Setup

```bash
cd my-app
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

> Make sure the backend is running before starting the frontend.

---

## 🔒 Security

- Passwords hashed with **bcrypt** before storing in the database
- Protected routes using **React Router DOM**
- User sessions managed via **localStorage**

---

## 📊 Analytics Features

- **Income vs. Expense Overview** — Side-by-side financial summary
- **Category-wise Distribution** — Understand where your money goes
- **Transaction Turnover** — Track flow over time
- **Spending Statistics** — Count, totals, and averages

---

## 🚀 Future Improvements

- [ ] JWT-based Authentication
- [ ] Recurring Transactions
- [ ] Monthly Budget Goals
- [ ] Export to CSV / PDF
- [ ] Dark Mode
- [ ] Enhanced Mobile Responsiveness
- [ ] Interactive Charts (Chart.js / Recharts)

---

## 🧠 What I Learned

- Full-stack architecture with React + Node.js + PostgreSQL
- REST API design and Express.js routing
- Authentication flow with bcrypt
- Cloud deployment across Vercel, Render, and Neon
- CORS configuration for cross-origin APIs
- Environment variable management for production
- Git & GitHub workflow for full-stack projects

---

## 👨‍💻 Author

**Sachin Bansal**

[![GitHub](https://img.shields.io/badge/GitHub-Sachin--Bansal94-black?style=flat-square&logo=github)](https://github.com/Sachin-Bansal94)

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub — it means a lot!
