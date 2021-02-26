const { Router } = require('express');
const Todo = require('../models/Todo');

module.exports = Router()
  .post('/', (req, res, next) => {
    Todo
      .insert(req.body)
      .then(todo => res.send(todo))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Todo
      .find()
      .then(todo => res.send(todo))
      .catch(next);
  });
