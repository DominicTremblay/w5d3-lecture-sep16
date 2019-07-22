const express = require('express');
const router = express.Router();

module.exports = ({ getTodos, addTodo }) => {
  router.get('/', (req, res) => {
    getTodos((err, todos) => {
      if (err) {
        return res.json({ msg: err.message });
      }

      res.json(todos);
    });
  });

  router.post('/', (req, res) => {
    addTodo(req.body, (err, result) => {
      if (err) {
        return res.json({ msg: err.message });
      }
      res.status(201).send(`${result.rowCount} todo has been created`);
    });
  });

  return router;
};
