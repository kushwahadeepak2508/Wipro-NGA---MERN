const express = require('express');
const { validationResult } = require('express-validator');
const { validateBook } = require('../validators/bookValidator');

const router = express.Router();

let books = [
  { id: 1, title: '1984', author: 'Orwell' },
  { id: 2, title: 'The Alchemist', author: 'Coelho' }
];
let nextId = books.length + 1;

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

router.post('/', validateBook(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, author } = req.body;
  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/:id', validateBook({ partial: true }), (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, author } = req.body;
  const updated = { ...books[index], ...(title && { title }), ...(author && { author }) };
  books[index] = updated;
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const deleted = books.splice(index, 1)[0];
  res.json({ deleted });
});

module.exports = router;
