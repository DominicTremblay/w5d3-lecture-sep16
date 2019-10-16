const formatByCategory = todos => {
  const [first] = todos;

  const todosCat = {
    categoryId: first.category_id,
    category: first.category,
  };

  todosCat.todos = todos.map(todo => ({
    todoId: todo.todo_id,
    task: todo.task,
    dueDate: todo.due_date,
    completed: todo.completed,
    completedOn: todo.completed_on,
  }));

  // todosCat.todos = todos.map(({id, task, due_date, completed, completed_on}) => ({
  //   todoId: id,
  //   task
  //   dueDate: due_date,
  //   completed: completed,
  //   completedOn: completed_on,
  // }));

  return todosCat;
};

module.exports = { formatByCategory };
