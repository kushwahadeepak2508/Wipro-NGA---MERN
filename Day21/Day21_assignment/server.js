// server.js
const express = require('express');
const path = require('path');
const morgan = require('morgan'); // optional for production

const app = express();
const PORT = process.env.PORT || 4000;

/**
 * Challenge 1: Global logging middleware
 * Logs: [METHOD] URL at ISO_TIMESTAMP
 * Keep this lightweight — only minimal synchronous work.
 */
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.originalUrl} at ${timestamp}`);
  next();
});

// Optional: use morgan for richer logs in production
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}


/**
 * Challenge 2: Built-in middleware to parse JSON and URL-encoded bodies
 * These are applied application-wide (or could be applied selectively).
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Setup EJS as view engine (Challenge 3)
 * By default, Express will look for templates in ./views
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* --- Example data store (in-memory) --- */
let courses = [
  { id: 1, title: 'Intro to Node.js', level: 'Beginner', seats: 30 },
  { id: 2, title: 'Advanced React', level: 'Advanced', seats: 12 },
  { id: 3, title: 'Databases 101', level: 'Intermediate', seats: 20 },
];

let users = []; // simple in-memory store for demo

/* --- Routes --- */

/* Home */
app.get('/', (req, res) => {
  res.send('Welcome to SkillSphere LMS — Day 21 demo');
});

/* GET /courses -> render EJS template listing courses (Challenge 3) */
app.get('/courses', (req, res) => {
  res.render('courses', { courses });
});

/* POST /users -> demonstrates express.json() parsing (Challenge 2) */
app.post('/users', (req, res) => {
  const payload = req.body; // parsed by express.json() or urlencoded
  // minimal validation (for demo)
  if (!payload || !payload.name || !payload.email) {
    return res.status(400).json({ message: 'Missing name or email' });
  }
  const newUser = { id: users.length + 1, ...payload, createdAt: new Date().toISOString() };
  users.push(newUser);
  // Expected Outcome: POST /users → {"message":"User created successfully","data":{...}}
  res.status(201).json({ message: 'User created successfully', data: newUser });
});

/* simple API to add a course (optional) */
app.post('/courses', (req, res) => {
  const { title, level, seats } = req.body;
  if (!title) return res.status(400).json({ message: 'title required' });
  const course = { id: courses.length + 1, title, level: level || 'Unknown', seats: seats || 0 };
  courses.push(course);
  res.status(201).json({ message: 'Course added', data: course });
});

/* 404 fallback */
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`SkillSphere Day 21 server listening on http://localhost:${PORT}`);
});
