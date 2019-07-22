const express = require('express');
const router = express.Router();

module.exports = DataHelpers => {
  router.get('/:id/todos', (req, res) => {
    const { id } = req.params;

    DataHelpers.getTodosByCategory(id, (err, todos) => {
      if (err) {
        return res.json({ msg: err.message });
      }
      res.status(200).json(todos);
    });
  });

  return router;
};
