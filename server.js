const express = require('express');
const { Client } = require('pg');
const port = process.env.PORT || 3000;
const app = express();
const todosRoutes = require('./routes/todos');

require('dotenv').config();

app.use(express.bodyParser());

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
    console.log(`Connected to ${pgClient.database} Database`);
    app.use('/todos', todosRoutes(pgClient));
  })
  .catch(err => console.error('connection error', err.stack));

app.listen(port, () => console.log(`Server listening on port ${port}`));
