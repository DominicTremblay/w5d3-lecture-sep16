const express = require('express');
const router = express.Router();

module.exports = pgClient => {
  router.get('/', (req, res) => {
    pgClient
      .query('SELECT * FROM todos')
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  return router;
};
