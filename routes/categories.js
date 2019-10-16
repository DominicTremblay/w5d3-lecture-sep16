const express = require('express');
const router = express.Router();
const { formatByCategory } = require('../helpers/formatHelpers');

module.exports = ({ todosByCategory }) => {
  // router.get('/', (req, res) => {
  //   // Query the db to get the list of todos
  //   const query = {
  //     text: 'SELECT * FROM categories;',
  //   };

  //   pgClient
  //     .query(query)
  //   // send the result back as json
  //     .then(data => res.json(data.rows))
  //     .catch(err => console.log(err));
  // });

  router.get('/:id/todos', (req, res) => {
    // extract the id from the url
    const { id } = req.params;

    todosByCategory(id)
      .then(data => res.json(formatByCategory(data)))
      .catch(err => console.log(err));
  });

  return router;
};
