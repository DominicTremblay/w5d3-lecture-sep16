const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const todosRoute = require('./routes/todos');
const categoriesRoute = require('./routes/categories');
const { Client } = require('pg');

require('dotenv').config();

const connectOptions = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pgClient = new Client(connectOptions);

pgClient
  .connect()
  .then(console.log(`Connected to ${pgClient.database}`))
  .catch(err => console.error('connection error', err.stack));

// parse application/json
app.use(bodyParser.json());

// Tell Express to use the todos routes for anything /todos
// app.use('/todos', todosRoute(pgClient));
// Tell Express to use the categories routes for anything /categories
// app.use('/categories', categoriesRoute(pgClient));

// Pass the instance of pgClient to dataHelpers
const dataHelpers = require('./helpers/dataHelpers')(pgClient);


// Tell Express to use the todos routes for anything /todos
// Passing dataHelpers to the route
app.use('/todos', todosRoute(dataHelpers));
// Tell Express to use the categories routes for anything /categories
// Passing dataHelpers to the route

app.use('/categories', categoriesRoute(dataHelpers));

app.listen(port, () => console.log(`Server listening on port ${port}`));
