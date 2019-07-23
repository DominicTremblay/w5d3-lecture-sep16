const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

require('dotenv').config();

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => console.log(`Server listening on port ${port}`));
