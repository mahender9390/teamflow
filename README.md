# TaskFlow

A full-stack Project Management System developed using **Spring Boot** and **React** that helps teams manage projects, tasks, comments, notifications, Root Cause Analysis (RCA), and review workflows through a secure JWT-based authentication system.

---

## Project Overview

TeamFlow is designed to provide a centralized platform for managing software development activities. It enables users to create and manage projects, assign and track tasks, collaborate through comments, investigate issues using Root Cause Analysis (RCA), manage review workflows, and receive real-time notifications.

The application follows a layered architecture using a Spring Boot REST API backend and a React frontend.

---

# Technology Stack

## Frontend

- React 19
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Bootstrap 5
- Axios
- React Router DOM
- React Toastify
- React Icons

## Backend

- Java 21
- Spring Boot 3
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate ORM
- Lombok
- Maven

## Database

- MySQL 8

## Development Tools

- Visual Studio Code
- MySQL Workbench
- Git
- GitHub
- Thunder Client

---

# Project Structure

```text
TeamFlow
│
├── backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
│
├── frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── utils/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── README.md
```

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected REST APIs
- Protected Frontend Routes

## Dashboard

- Dashboard Statistics
- Project Summary
- Task Summary
- Notification Summary

## Project Management

- Create Project
- View Projects
- Update Project
- Delete Project

## Task Management

- Create Task
- Assign Task
- View Task Details
- Update Task
- Delete Task

## Task Dependencies

- Backend support for task dependency management
- Create task dependency relationships through REST APIs
- View task dependencies for a task
- Delete task dependencies
- Frontend interface planned for future enhancement

## Comments

- Add Comments
- View Comments
- Delete Comments

## Notifications

- View Notifications
- Mark Notifications as Read
- Delete Notifications

## Root Cause Analysis (RCA)

- Create RCA
- Update RCA
- Delete RCA
- View RCA

## Reviews

- Create Review
- Update Review
- Delete Review
- View Reviews

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/mahender9390/teamflow.git
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Configure the database in:

```
src/main/resources/application.properties
```

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/teamflow_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend URL:

```
http://localhost:8080
```

---

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the frontend.

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# Environment Variables

Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

# Database

Database Name

```
teamflow_db
```

Database Engine

```
MySQL 8
```

---

# REST API Modules

- Authentication
- Dashboard
- Projects
- Tasks
- Comments
- Notifications
- Root Cause Analysis (RCA)
- Reviews

---

# Assumptions

- Each task belongs to one project.
- A task can be assigned to one user.
- RCA is associated with a task.
- Reviews are associated with RCAs.
- JWT authentication is required to access protected resources.

---

# Known Limitations

- Role-based authorization is not implemented.
- File upload functionality is not available.
- Email notifications are not implemented.
- Advanced search and filtering are not implemented.
- Pagination is not implemented.

---

# Future Enhancements

- Role-based Authorization
- Email Notifications
- File Attachments
- Dashboard Analytics
- Advanced Search
- Pagination
- Activity Logs
- User Profile Management

---

# GitHub Repository

https://github.com/mahender9390/teamflow

---

# Author

**Mahender V**

B.Tech Computer Science and Engineering

Sreenidhi Institute of Science and Technology
