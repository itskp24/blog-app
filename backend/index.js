require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

app.use('/api/posts', postsRouter);
app.use('/api/posts', commentsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running 🚀' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
