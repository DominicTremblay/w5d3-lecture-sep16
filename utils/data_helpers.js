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
    getTodosByCategory: (category_id, callback) => {
      const query = {
        text:
          'SELECT * FROM categories INNER JOIN todos ON categories.id = todos.category_id WHERE categories.id = $1',
        values: [category_id],
      };

      pgClient
        .query(query)
        .then(data => {
          callback(null, data.rows);
        })
        .catch(err => {
          callback(err, null);
        });
    },
  };
};
