module.exports = pgClient => {
  const getTodos = () => {
    const query = {
      text: 'SELECT * FROM todos;',
    };

    return (
      pgClient
        .query(query)
    // send the result back as json
        .then(data => data.rows)
    );
  };

  const addTodo = (task, dueDate, categoryId) => {
    // Create a query to insert data into the database
    // We need to create a parameterized query to make it safe
    const query = {
      text: 'INSERT INTO todos(task, due_date, category_id) VALUES($1, $2, $3)',
      values: [task, dueDate, categoryId],
    };

    // executing the query
    return pgClient
      .query(query)
      .then(data => ({ msg: `${data.rowCount} todos have been inserted` }))
      .catch(err => console.log(err));
  };

  const todosByCategory = categoryId => {
    // write the query

    const query = {
      text:
                'SELECT todos.id AS todo_id, categories.id AS category_id, categories.category, todos.task, todos.due_date, todos.completed, todos.completed_on FROM todos INNER JOIN categories ON todos.category_id = categories.id WHERE category_id = $1',
      values: [categoryId],
    };

    // excute the query and return the result
    return pgClient.query(query).then(data => data.rows);
  };

  return {
    getTodos,
    addTodo,
    todosByCategory
  };
};
