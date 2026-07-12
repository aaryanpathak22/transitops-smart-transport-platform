# TransitOps Smart Transport Platform

A Smart Transport Operations Platform built for the Odoo Hackathon 2026.

## Team

- Aaryan Pathak
- Bhoomi Saini
- Poonam Singh


---

# Overview

TransitOps is a fleet management platform designed to help transport operators manage vehicles, drivers, fleet information and operational dashboards from a centralized web application.

The project follows a modern full-stack architecture with:

- FastAPI Backend
- React + TypeScript Frontend
- PostgreSQL Database
- SQLAlchemy ORM
- Alembic Migrations
- JWT Authentication
- REST APIs

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected APIs

## Vehicle Management

- Create Vehicle
- View Vehicles
- Update Vehicle
- Delete Vehicle
- Vehicle Status Tracking

## Driver Management

- Driver CRUD APIs
- Driver Assignment
- Driver Status Management

## Dashboard

- Fleet Overview
- Vehicle Statistics
- Active Trips
- Fleet Analytics

## Reports

- Fleet Reports UI
- Report Dashboard
- Operational Insights

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic
- JWT Authentication

---

# Project Structure

```
transitops-smart-transport-platform/

backend/
    app/
        api/
        models/
        schemas/
        services/
        db/

frontend/
    src/
        pages/
        components/
        services/
        layouts/

README.md
```

---

# API Endpoints

## Authentication

```
POST /register
POST /login
```

## Vehicles

```
GET /vehicles
POST /vehicles
PUT /vehicles/{id}
DELETE /vehicles/{id}
```

## Drivers

```
GET /drivers
POST /drivers
PUT /drivers/{id}
DELETE /drivers/{id}
```

---

# Running the Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

---

# Running the Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# Integration

The frontend communicates with the FastAPI backend using Axios.

Vehicle Management has been integrated with backend REST APIs.

Verified workflow:

1. Create a vehicle using Swagger UI.
2. Vehicle is stored in PostgreSQL.
3. Refresh the frontend.
4. Newly created vehicle appears automatically in the Vehicles page.

This demonstrates successful frontend-backend integration.

---

# Future Improvements

- Dashboard API integration
- Driver UI integration
- Report generation APIs
- Route Optimization
- Live Vehicle Tracking
- Notification System
- Role Based Access Control
- Analytics and Insights

---

# Screenshots

- Dashboard
- Vehicles
- Drivers
- Reports
- Swagger API Documentation

---

# License

Developed for Odoo Hackathon 2026.
