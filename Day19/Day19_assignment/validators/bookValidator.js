const { body } = require('express-validator');

function validateBook(options = { partial: false }) {
  const checks = [];
  if (options.partial) {
    checks.push(body('title').optional().isString().notEmpty());
    checks.push(body('author').optional().isString().notEmpty());
  } else {
    checks.push(body('title').exists().isString().notEmpty());
    checks.push(body('author').exists().isString().notEmpty());
  }
  return checks;
}

module.exports = { validateBook };
