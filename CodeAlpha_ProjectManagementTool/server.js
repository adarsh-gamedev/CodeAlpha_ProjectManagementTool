// CodeAlpha Internship — Task 3: Project Management Tool
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3002;
app.use(cors()); app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let users = [
  { id: 'u1', name: 'Rahul Sharma', initials: 'RS' },
  { id: 'u2', name: 'Priya Kapoor', initials: 'PK' },
  { id: 'u3', name: 'Arjun Mehta',  initials: 'AM' },
  { id: 'u4', name: 'Sneha Rao',    initials: 'SR' },
];

let projects = [
  { id: 'p1', name: 'CodeAlpha App', desc: 'Full-stack internship projects.', color: '#185FA5', members: ['u1','u2','u3','u4'], createdAt: new Date() },
  { id: 'p2', name: 'Portfolio Site', desc: 'Personal developer portfolio.', color: '#1D9E75', members: ['u1'], createdAt: new Date() },
];

let tasks = [
  { id: 't1', projectId: 'p1', title: 'Design homepage wireframe', status: 'Done',        assignee: 'u2', priority: 'high',   due: '2025-06-10', tag: 'Design',  desc: 'Wireframes for all main pages.', comments: [{userId:'u1',text:'Looking great!'}] },
  { id: 't2', projectId: 'p1', title: 'Setup Express.js backend',   status: 'Done',        assignee: 'u1', priority: 'high',   due: '2025-06-12', tag: 'Backend', desc: 'Initialize project and routes.', comments: [] },
  { id: 't3', projectId: 'p1', title: 'Build product listing API',  status: 'In Progress', assignee: 'u1', priority: 'high',   due: '2025-06-23', tag: 'Backend', desc: 'REST endpoints for products.', comments: [{userId:'u3',text:'Add pagination!'}] },
  { id: 't4', projectId: 'p1', title: 'Shopping cart component',    status: 'In Progress', assignee: 'u2', priority: 'medium', due: '2025-06-24', tag: 'Feature', desc: 'Cart with qty logic.', comments: [] },
  { id: 't5', projectId: 'p1', title: 'Auth system (JWT)',          status: 'Review',      assignee: 'u4', priority: 'high',   due: '2025-06-20', tag: 'Backend', desc: 'Login/register with JWT.', comments: [] },
  { id: 't6', projectId: 'p1', title: 'Write API documentation',   status: 'Backlog',     assignee: 'u3', priority: 'low',    due: '2025-06-30', tag: 'Docs',    desc: 'Swagger docs for endpoints.', comments: [] },
];

let taskCounter = 100;

app.get('/api/users', (req, res) => res.json({ success: true, data: users }));
app.get('/api/projects', (req, res) => res.json({ success: true, data: projects }));
app.post('/api/projects', (req, res) => {
  const { name, desc, color } = req.body;
  const project = { id: 'p' + Date.now(), name, desc, color, members: ['u1'], createdAt: new Date() };
  projects.push(project);
  res.json({ success: true, data: project });
});
app.get('/api/projects/:id/tasks', (req, res) => {
  res.json({ success: true, data: tasks.filter(t => t.projectId === req.params.id) });
});
app.post('/api/tasks', (req, res) => {
  const task = { id: 't' + taskCounter++, ...req.body, comments: [], createdAt: new Date() };
  tasks.push(task);
  res.json({ success: true, data: task });
});
app.put('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false });
  tasks[idx] = { ...tasks[idx], ...req.body };
  res.json({ success: true, data: tasks[idx] });
});
app.post('/api/tasks/:id/comment', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ success: false });
  const comment = { userId: req.body.userId, text: req.body.text, createdAt: new Date() };
  task.comments.push(comment);
  res.json({ success: true, comment });
});
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Project Management server running at http://localhost:${PORT}`));
