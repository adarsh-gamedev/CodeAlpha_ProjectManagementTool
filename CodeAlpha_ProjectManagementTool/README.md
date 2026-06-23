# CodeAlpha Internship — Task 3: Project Management Tool

A collaborative project management tool (similar to Trello/Asana) with Kanban boards, task assignment, comments, and notifications.

## Features
- Create and manage group projects
- Kanban board with 4 columns: Backlog, In Progress, Review, Done
- Create, assign, edit, and move tasks
- Priority levels (High, Medium, Low)
- Comment and communicate within tasks
- Notification system
- My Tasks view
- Dashboard with activity feed
- RESTful API backend

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **API:** RESTful JSON API

## Setup & Run
```bash
npm install
npm start
```
Open http://localhost:3002

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project |
| GET | /api/projects/:id/tasks | Get project tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| POST | /api/tasks/:id/comment | Add comment |
| DELETE | /api/tasks/:id | Delete task |

## Internship
**Organization:** CodeAlpha  
**Task:** Full Stack Development — Task 3
