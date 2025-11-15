const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/books');
const logger = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('Welcome to Express Server');
});

app.get('/status', (req, res) => {
  res.json({ server: 'running', uptime: 'OK' });
});

app.get('/products', (req, res) => {
  const name = req.query.name;
  if (name) {
    return res.json({ query: name, message: `Searching for product: ${name}` });
  }
  return res.status(400).send('Please provide a product name');
});

app.use('/books', bookRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
