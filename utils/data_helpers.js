module.exports = pgClient => {
  return {
    getTodos: callback => {
      const query = {
        text: 'SELECT * FROM todos',
      };
      pgClient
        .query(query)
        .then(data => {
          callback(null, data.rows);
        })
        .catch(err => {
          callback(err.message, null);
        });
    },
    addTodo: (newTodo, callback) => {
      const { task, due_date, category_id } = newTodo;
      const query = {
        text:
          'INSERT INTO todos(task, due_date, category_id) VALUES($1, $2, $3)',
        values: [task, due_date, category_id],
      };
      pgClient
        .query(query)
        .then(result => {
          callback(null, result);
        })
        .catch(err => callback(err, null));
    },
  };
};
