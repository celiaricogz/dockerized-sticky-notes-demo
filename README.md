Sticky Notes – Dockerized Full-Stack App

![Sticky Notes Screenshot](./docs/screenshot.png)

A simple yet modern notes application, designed to showcase a **fully dockerized Full-Stack flow (React + Node.js + Postgres)**, with separate environments for development and production.

---

## ✨ Features

- **Frontend:** React with React Router, clean SaaS-style design.
- **Backend:** Node.js + Express + Postgres (real persistence).
- **Database:** PostgreSQL 15 with automatic initialization.
- **Separate containers** for frontend, backend, and DB.
- **Optimized for CI/CD and container deployment.**
- **Ready-to-use environments:** Development (hot reload) and Production (Nginx with cache and gzip).

---

## 🚀 Technologies Used
- React + React Router (Frontend)
- Node.js + Express (API)
- PostgreSQL 15 (DB)
- Docker & Docker Compose (Orchestration)
- Nginx (Optimized server in production)

---

## 📦 How to Run the Project

### Development (with hot reload)
```bash
docker compose -f docker-compose.yml -f docker-compose.override.yml up
```
Access at [http://localhost:3000](http://localhost:3000)

### Production (optimized build)
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```
Access at [http://localhost](http://localhost)

---

## 🖼 Online Demo
*(If you deploy on Render/Railway/Fly.io, you would put the link here, for example)*  
**[View demo](https://tudemo.com)**

---

## 📂 Structure
```
.
├── frontend/    # React app (Landing + Board)
├── backend/     # Express API with Postgres
├── docker-compose.yml          # Base config
├── docker-compose.override.yml # Development environment
├── docker-compose.prod.yml     # Production environment
└── README.md
```

## 📄 License

Licensed under the **MIT License**.  
See [LICENSE](LICENSE) for more details.

---

## 👩‍💻 Author

**Celia Rico Gutiérrez**  
DevOps Engineer — CI/CD automation, modularization, reproducible packaging  
🔗 [LinkedIn](https://www.linkedin.com/in/celiaricogutierrez)  
🔗 [Malt](https://www.malt.es/profile/celiaricogutierrez)
🔗 [UpWork](https://www.upwork.com/freelancers/~01898dfb872ff48b7a?mp_source=share)

---

📅 _Last updated: July 2025_
