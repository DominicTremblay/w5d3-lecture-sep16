const express = require('express');
const router = express.Router();

module.exports = ({getTodos, addTodo}) => {
  router.get('/', (req, res) => {
    // Query the db to get the list of todos

    getTodos()
      .then(data => res.json(data))
      .catch(err => console.log(err));
  });

  router.post('/', (req, res) => {
    // extract the info from the request
    const { task, due_date: dueDate, category_id: categoryId } = req.body;

    addTodo(task, dueDate, categoryId)
      .then(data => res.json(data))
      .catch(err => console.log(err));

  });

  return router;
};
