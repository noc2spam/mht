# Health Tracker Application

## Description

This is a health tracker application that allows users to track their daily activities. The application will show a graph of the user's past activities. The application lets the user to add/update daily activity logs.

## Stack

- Frontend: Next.js (React)
- Backend: Node.js (Express)
- Database: SQLite

## Installation

1. Clone the repository
2. copy the `.env.example` file to `.env` and update the values.
3. Run `docker compose up --build -d` to deploy the applications.
4. For the first time, run `docker exec -it mht-backend npx prisma migrate deploy` to create the database tables.

The frontend application will be available at `http://localhost:5000` and the backend application will be available at `http://localhost:5001`. Use a reverse proxy to expose the apps to the world.
