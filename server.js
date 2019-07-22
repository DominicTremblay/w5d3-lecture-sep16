const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const todosRoutes = require('./routes/todos');
const categoriesRoutes = require('./routes/categories');

require('dotenv').config();

// parse application/json
app.use(bodyParser.json());

const connectionOptions = {
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pgClient = new Client(connectionOptions);

pgClient
  .connect()
  .then(() => {
    const DataHelpers = require('./utils/data_helpers')(pgClient);
    console.log(`Connected to ${pgClient.database} Database`);
    app.use('/todos', todosRoutes(DataHelpers));
    app.use('/categories', categoriesRoutes(DataHelpers));
  })
  .catch(err => console.error('connection error', err.stack));

app.listen(port, () => console.log(`Server listening on port ${port}`));
