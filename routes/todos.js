const express = require('express');
const router = express.Router();

module.exports = pgClient => {
  router.get('/', (req, res) => {
    const query = {
      text: 'SELECT * FROM todos',
    };
    pgClient
      .query(query)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  router.post('/', (req, res) => {
    const { task, due_date, category_id } = req.body;

    const query = {
      text: 'INSERT INTO todos(task, due_date, category_id) VALUES($1, $2, $3)',
      values: [task, due_date, category_id],
    };

    pgClient
      .query(query)
      .then(result => {
        console.log(result);
        res.status(201).send(`${result.rowCount} todo has been created`);
      })
      .catch(err => console.log(err.message));
  });

  return router;
};
