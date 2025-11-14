# Task Tracker - Full-Stack Web Application

A task management application built with Next.js, React, Django Rest Framework and PostgreSQL, featuring Google OAuth authentication and an immersive 3D landing experience.

![Project Banner](https://img.shields.io/badge/Next.js-16.0.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Django Rest Framework](https://img.shields.io/badge/django--rest--framework-3.16.1-blue?style=for-the-badge&labelColor=333333&logo=django&logoColor=white&color=blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Key Highlights](#key-highlights)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [What I Learned](#what-i-learned)

---

## Overview

**Task Tracker** is a full-stack web application that demonstrates web development practices, combining a beautiful React frontend with Django Rest Framework. The application features:

- **Secure Authentication**: Google OAuth 2.0 integration for seamless sign-in
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Multi-User Support**: Each user sees only their own tasks
- **3D Experience**: Immersive 3D landing page using Three.js
- **Real-Time Updates**: Instant UI updates using Zustand state management
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Production Ready**: Deployed with Docker, Vercel and Render

---

## Features

### Authentication
- **Google OAuth 2.0** - Secure, one-click sign-in
- **JWT Tokens** - Stateless authentication with access & refresh tokens
- **Protected Routes** - Automatic redirection for unauthenticated users
- **Cookie-Based Storage** - Secure token storage in HTTP-only cookies

### Task Management
- **Create Tasks** - Add new tasks with a simple input
- **View Tasks** - See all your tasks in a clean, organized list
- **Toggle Complete** - Mark tasks as done/undone with a click
- **Delete Tasks** - Remove tasks you no longer need
- **Real-Time Sync** - Changes reflect instantly across all sessions

### User Experience
- **Modern UI** - Gradient backgrounds, smooth animations
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Smooth Transitions** - Slide-in/slide-out animations throughout
- **3D Landing Page** - Interactive 3D model on the login screen

### Technical Features
- **Fast Performance** - Optimized with Next.js 16 and React 19
- **TypeScript** - Full type safety for better code quality
- **Modular Architecture** - Clean separation of concerns
- **Docker Support** - Containerized for easy deployment
- **State Management** - Efficient state handling with Zustand

---

## Tech Stack

### Frontend
```
Next.js 16.0.3      │ React framework with SSR, routing and optimization
React 19.2.0        │ UI library for building component-based interfaces
TypeScript 5        │ Type-safe JavaScript for catching errors early
Zustand 5.0.8       │ Lightweight state management
Tailwind CSS 4      │ Utility-first CSS framework for rapid styling
Axios 1.13.2        │ Promise-based HTTP client for API requests
Three.js 0.181.1    │ 3D graphics library for WebGL rendering
React Three Fiber   │ React renderer for Three.js (declarative 3D)
React Three Drei    │ Helper components for React Three Fiber
```

### Backend
```
Django 5.2          │ High-level Python web framework
Django REST         │ Powerful toolkit for building REST APIs
PostgreSQL 15       │ Advanced open-source relational database
Gunicorn            │ Python WSGI HTTP server for production
JWT Authentication  │ JSON Web Tokens for stateless auth
Django CORS         │ Cross-Origin Resource Sharing middleware
Requests            │ HTTP library for OAuth token exchange
```

### DevOps & Tools
```
Docker & Compose    │ Containerization for consistent environments
Vercel              │ Frontend hosting with global CDN
Render              │ Backend hosting with free PostgreSQL
Git & GitHub        │ Version control and CI/CD pipeline
ESLint              │ JavaScript/TypeScript linting
```

---

## Project Architecture

### High-Level Architecture

```
┌────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                      │
│                                                        │
│  ┌──────────────────────────────────────────────┐      │
│  │         Frontend (Next.js + React)           │      │
│  │  ┌──────────────┐      ┌─────────────────┐   │      │
│  │  │  3D Scene    │      │  Task Manager   │   │      │
│  │  │ (Three.js)   │      │  (React + TS)   │   │      │
│  │  └──────────────┘      └─────────────────┘   │      │
│  │                                              │      │
│  │  ┌──────────────────────────────────────┐    │      │
│  │  │    Zustand Store (State Mgmt)        │    │      │
│  │  │  - Auth State  - Task State          │    │      │
│  │  └──────────────────────────────────────┘    │      │
│  └──────────────────────────────────────────────┘      │
└────────────────────┬───────────────────────────────────┘
                     │
                     │ HTTPS API Calls (Axios)
                     │ Authorization: Bearer <JWT>
                     │
┌────────────────────▼──────────────────────────────────┐
│                Backend (Django + DRF)                 │
│                                                       │
│  ┌──────────────────────────────────────────────┐     │
│  │        Django REST Framework                 │     │
│  │                                              │     │
│  │  ┌───────────────┐    ┌───────────────┐      │     │
│  │  │ Auth Endpoint │    │ Task ViewSet  │      │     │
│  │  │ (OAuth Logic) │    │ (CRUD Ops)    │      │     │
│  │  └───────────────┘    └───────────────┘      │     │
│  │                                              │     │
│  │  ┌────────────────────────────────────┐      │     │
│  │  │  JWT Authentication Middleware     │      │     │
│  │  │  - Verify tokens                   │      │     │
│  │  │  - Extract user from payload       │      │     │
│  │  └────────────────────────────────────┘      │     │
│  └──────────────────────────────────────────────┘     │
└────────────────────┬──────────────────────────────────┘
                     │
                     │ SQL Queries (Django ORM)
                     │
┌────────────────────▼──────────────────────────────────┐
│             PostgreSQL Database                       │
│                                                       │
│  ┌───────────────────┐    ┌──────────────────┐        │
│  │   Users Table     │    │   Tasks Table    │        │
│  │ ───────────────── │    │ ──────────────── │        │
│  │ id                │    │ id               │        │
│  │ email             │    │ user_id (FK)     │        │
│  │ first_name        │    │ title            │        │
│  │ last_name         │    │ completed        │        │
│  └───────────────────┘    │ created_at       │        │
│                           └──────────────────┘        │
└───────────────────────────────────────────────────────┘
```

### Data Flow Example: Creating a Task

```
1. USER ACTION
   └─> User types "Buy groceries" and clicks "Add Task"

2. FRONTEND (React Component)
   └─> handleAdd() function triggered
   └─> Validates input (title.trim())
   └─> Calls Zustand store: addTask("Buy groceries")

3. ZUSTAND STORE (State Management)
   └─> Executes addTask action
   └─> Makes HTTP request via Axios:
       POST https://backend.com/api/tasks/
       Headers: { Authorization: "Bearer eyJhbG..." }
       Body: { "title": "Buy groceries" }

4. BACKEND (Django)
   └─> Gunicorn receives request
   └─> Django middleware processes request
   └─> JWT authentication verifies token
   └─> Extracts user from token payload
   └─> Routes to TaskViewSet.create()

5. DJANGO REST FRAMEWORK
   └─> TaskSerializer validates data
   └─> Creates Task model instance
   └─> Saves to database with user association
   └─> Returns serialized response

6. POSTGRESQL
   └─> Executes: INSERT INTO tasks (user_id, title, completed)
                 VALUES (1, 'Buy groceries', false)
   └─> Returns new task with id=5

7. RESPONSE BACK TO FRONTEND
   └─> Backend: { "id": 5, "title": "Buy groceries", "completed": false }
   └─> Zustand updates state
   └─> React re-renders component
   └─> New task appears in UI instantly!
```

---

## Key Highlights

### 1. 3D Landing Experience

The application features an immersive 3D landing page built with Three.js and React Three Fiber:

```typescript
// Scene3D.tsx - 3D Model with animations
- Loads a 5.93 MB GLB model (Silent Hill Library scene)
- Automatic centering and scaling
- Smooth zoom-in animation on load
- Continuous auto-rotation after zoom
- Optimized rendering with React Three Fiber
- Suspense boundary for loading states
```

**Technical Implementation:**
- Uses `useGLTF` hook for efficient model loading
- `useFrame` hook for 60fps animation loop
- Ease-out cubic bezier for smooth zoom transition
- Proper cleanup and memory management

### 2. State Management with Zustand

Instead of Redux, I chose **Zustand** for its simplicity:

```typescript
// Why Zustand over Redux?
✅ 90% less boilerplate code
✅ No context providers needed
✅ Built-in TypeScript support
✅ Smaller bundle size (1KB vs 3KB+)
✅ Simpler learning curve

// useTaskStore.ts - Clean and simple
const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: async (title) => {
    const { data } = await api.post('/api/tasks/', { title });
    set(state => ({ tasks: [data, ...state.tasks] }));
  }
}));
```

### 3. Google OAuth Flow

Secure authentication without managing passwords:

```
User Flow:
1. User clicks "Sign in with Google"
2. Redirects to Google OAuth page
3. User authorizes application
4. Google redirects back with auth code
5. Frontend sends code to backend
6. Backend exchanges code for user info
7. Backend creates/finds user in database
8. Backend generates JWT tokens
9. Frontend stores tokens in cookies
10. User is authenticated!

Security Features:
- JWT tokens with expiration
- HTTP-only cookies (XSS protection)
- CORS configuration
- Refresh token rotation
```

### 4. Responsive Design System

Built with Tailwind CSS for a modern, adaptive interface:

```css
/* Mobile-First Approach */
- Base: Mobile styles (default)
- sm: Tablet (640px+)
- md: Desktop (768px+)
- lg: Large screens (1024px+)

/* Design Features */
- Glassmorphism (backdrop-blur)
- Gradient backgrounds
- Smooth transitions (200-300ms)
- Hover states and animations
- Custom scrollbars
- Particle effects
```

---

## Project Structure

```
tasktracker/
│
├── frontend/                         # Next.js Frontend Application
│   ├── app/                          
│   │   ├── page.tsx                  # Main task manager page
│   │   ├── layout.tsx                # Root layout with metadata
│   │   ├── globals.css               # Global styles & Tailwind
│   │   └── auth/
│   │       └── callback/
│   │           └── page.tsx          # Google OAuth callback handler
│   │
│   ├── components/
│   │   └── Scene3D.tsx               # Three.js 3D scene component
│   │
│   ├── store/                        # Zustand state management
│   │   ├── useAuthStore.ts           # Authentication state & actions
│   │   └── useTaskStore.ts           # Task state & CRUD actions
│   │
│   ├── public/
│   │   └── silent_hill-library.glb   # 3D model (5.93 MB)
│   │
│   ├── package.json                  # Node dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── next.config.ts                # Next.js config (GLB caching)
│   ├── tailwind.config.ts            # Tailwind CSS config
│   ├── eslint.config.mjs             # ESLint rules
│   ├── Dockerfile                    # Docker container setup
│   └── .dockerignore                 # Docker ignore rules
│
└── backend/                          # Django Backend Application
    ├── core/                         # Main Django project
    │   ├── settings.py               # Configuration & middleware
    │   ├── urls.py                   # URL routing
    │   ├── views.py                  # Google OAuth logic
    │   └── wsgi.py                   # WSGI entry point
    │
    ├── tasks/                        # Tasks Django app
    │   ├── models.py                 # Task database model
    │   ├── views.py                  # API endpoints (ViewSet)
    │   ├── serializers.py            # Data serialization (JSON)
    │   ├── urls.py                   # Task-specific routes
    │   └── admin.py                  # Django admin configuration
    │
    ├── manage.py                     # Django CLI tool
    ├── requirements.txt              # Python dependencies
    ├── Dockerfile                    # Docker container setup
    └── .dockerignore                 # Docker ignore rules
```

---

## Getting Started

### Prerequisites

```bash
# Required software
- Node.js 20+ and npm
- Python 3.11+
- PostgreSQL 15+
- Docker & Docker Compose (optional)
- Git
```

### Option 1: Local Development (Without Docker)

#### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/tasktracker.git
cd tasktracker/backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create PostgreSQL database
createdb tasktracker

# 5. Set environment variables
cat > .env << EOF
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://postgres:password@localhost:5432/tasktracker
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EOF

# 6. Run migrations
python manage.py migrate

# 7. Create superuser (optional)
python manage.py createsuperuser

# 8. Start development server
python manage.py runserver
# Backend running at http://localhost:8000
```

#### Frontend Setup

```bash
# 1. Navigate to frontend
cd ../frontend

# 2. Install dependencies
npm install

# 3. Set environment variables
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
EOF

# 4. Start development server
npm run dev
# Frontend running at http://localhost:3000
```

### Option 2: Docker Development (Recommended)

```bash
# 1. Clone repository
git clone https://github.com/yourusername/tasktracker.git
cd tasktracker

# 2. Create docker-compose.yml (see Docker section)

# 3. Set environment variables in .env files

# 4. Start all services
docker-compose up --build

# Services will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# Database: localhost:5432
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/callback`
5. Copy Client ID and Client Secret
6. Add to environment variables

---

## How It Works

### Authentication Flow

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       │ 1. Clicks "Sign in with Google"
       ▼
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │ 2. Redirects to Google
       ▼
┌─────────────┐
│   Google    │
└──────┬──────┘
       │ 3. User authorizes
       │ 4. Returns auth code
       ▼
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │ 5. Sends code to backend
       ▼
┌─────────────┐
│   Backend   │──┐
└──────┬──────┘  │ 6. Exchange code for token
       │         │ 7. Get user info from Google
       │         │ 8. Create/find user in DB
       │◄────────┘
       │ 9. Generate JWT tokens
       ▼
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │ 10. Store tokens in cookies
       ▼
┌─────────────┐
│    User     │ Authenticated!
└─────────────┘
```

### Task CRUD Operations

```typescript
// CREATE
POST /api/tasks/
Body: { "title": "Buy groceries" }
Response: { "id": 5, "title": "Buy groceries", "completed": false }

// READ (List all user's tasks)
GET /api/tasks/
Response: [
  { "id": 1, "title": "Task 1", "completed": false },
  { "id": 2, "title": "Task 2", "completed": true }
]

// UPDATE (Toggle completion)
PATCH /api/tasks/5/
Body: { "completed": true }
Response: { "id": 5, "title": "Buy groceries", "completed": true }

// DELETE
DELETE /api/tasks/5/
Response: 204 No Content
```

---

## API Documentation

### Base URL
```
Development: http://localhost:8000
Production: https://your-backend.onrender.com
```

### Authentication

All task endpoints require authentication via JWT token in the Authorization header:

```http
Authorization: Bearer <access_token>
```

### Endpoints

#### 1. Google OAuth Callback

```http
POST /auth/google/callback/
Content-Type: application/json

{
  "code": "4/0AY0e-g7...",
  "redirect_uri": "http://localhost:3000/auth/callback"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "email": "user@gmail.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

#### 2. Get Current User

```http
GET /auth/me/
Authorization: Bearer <access_token>

Response: 200 OK
{
  "id": 1,
  "email": "user@gmail.com",
  "first_name": "John",
  "last_name": "Doe"
}
```

#### 3. List Tasks

```http
GET /api/tasks/
Authorization: Bearer <access_token>

Response: 200 OK
[
  {
    "id": 1,
    "title": "Buy groceries",
    "completed": false,
    "created_at": "2025-01-15T10:30:00Z",
    "user": 1
  }
]
```

#### 4. Create Task

```http
POST /api/tasks/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "New task"
}

Response: 201 Created
{
  "id": 5,
  "title": "New task",
  "completed": false,
  "created_at": "2025-01-15T11:00:00Z",
  "user": 1
}
```

#### 5. Update Task

```http
PATCH /api/tasks/5/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "completed": true
}

Response: 200 OK
{
  "id": 5,
  "title": "New task",
  "completed": true,
  "created_at": "2025-01-15T11:00:00Z",
  "user": 1
}
```

#### 6. Delete Task

```http
DELETE /api/tasks/5/
Authorization: Bearer <access_token>

Response: 204 No Content
```

---

## Deployment

### Frontend Deployment (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy from frontend directory
cd frontend
vercel

# 4. Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# 5. Deploy to production
vercel --prod
```

**Vercel Configuration** (vercel.json):
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### Backend Deployment (Render)

1. **Create Render Account** at [render.com](https://render.com)

2. **Create PostgreSQL Database**:
   - New → PostgreSQL
   - Name: tasktracker-db
   - Save connection string

3. **Create Web Service**:
   - New → Web Service
   - Connect GitHub repository
   - Root Directory: `backend`
   - Environment: Docker
   - Add environment variables:
     ```
     DEBUG=False
     SECRET_KEY=<generate-random-key>
     DATABASE_URL=<postgres-connection-string>
     ALLOWED_HOSTS=your-backend.onrender.com
     CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
     GOOGLE_CLIENT_ID=<your-google-client-id>
     GOOGLE_CLIENT_SECRET=<your-google-client-secret>
     ```

4. **Deploy**: Render will automatically build and deploy

### Docker Deployment

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: tasktracker
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    command: >
      sh -c "python manage.py migrate &&
             gunicorn core.wsgi:application --bind 0.0.0.0:8000"
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/tasktracker

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000

volumes:
  postgres_data:
```

**Deploy with Docker**:
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## Screenshots

![Login Page](frontend/public/login-page.png)

### Login Page with 3D Scene
Beautiful landing page featuring:
- Interactive 3D model (Silent Hill Library)
- Smooth zoom-in animation
- Auto-rotating model
- Glassmorphism sign-in card
- Gradient overlay for better text visibility


![Task Dashboard](frontend/public/task-dashboard.png)

### Task Manager Dashboard
Clean and modern interface with:
- Gradient header with user email
- Real-time task list
- Smooth hover effects
- Toggle completion with click
- Delete button on hover
- Empty state message
- Animated particle background

---

## What I Learned

### Frontend Development

1. **Next.js 16 App Router**
   - File-based routing system
   - Server and client components
   - Metadata API for SEO
   - Image optimization

2. **React 19 Features**
   - Modern hooks (useState, useEffect)
   - Component composition
   - State management patterns
   - Event handling

3. **TypeScript Benefits**
   - Type safety prevents runtime errors
   - Better IDE autocomplete
   - Self-documenting code
   - Interfaces and generics

4. **Zustand State Management**
   - Simpler than Redux
   - No boilerplate required
   - Perfect for small to medium apps
   - Built-in TypeScript support

5. **Three.js & React Three Fiber**
   - 3D graphics in the browser
   - WebGL rendering optimization
   - Loading and displaying 3D models
   - Animation loops with useFrame
   - Lighting and camera setup

6. **Tailwind CSS**
   - Utility-first CSS approach
   - Responsive design with breakpoints
   - Custom animations and transitions
   - Dark mode support

### Backend Development

1. **Django REST Framework**
   - ViewSets for automatic CRUD endpoints
   - Serializers for data validation
   - Authentication and permissions
   - Custom actions and methods

2. **Database Design**
   - Django ORM for database queries
   - Foreign key relationships
   - Migrations for schema changes
   - Query optimization

3. **Authentication**
   - OAuth 2.0 protocol implementation
   - JWT token generation and validation
   - Secure cookie-based storage
   - Refresh token rotation

4. **API Design**
   - RESTful principles
   - Proper HTTP status codes
   - Error handling and validation
   - CORS configuration

### DevOps & Deployment

1. **Docker Containerization**
   - Multi-stage builds for optimization
   - Docker Compose for local development
   - Volume management for data persistence
   - Container networking

2. **Cloud Deployment**
   - Vercel for frontend hosting
   - Render for backend + database
   - Environment variable management
   - CI/CD with GitHub integration

3. **Performance Optimization**
   - Image and asset caching
   - Code splitting and lazy loading
   - Database query optimization
   - CDN for global content delivery

---
### **NOTE:** 
If this type of error occurs:
```
django.core.exceptions.ImproperlyConfigured: The SECRET_KEY setting must not be empty.
``` 
then simply change "os.environ.get" to "config" in `backend/core/settings.py`.

---

<div align="center">

**⭐ Star this repo if you found it helpful! ⭐**

</div>