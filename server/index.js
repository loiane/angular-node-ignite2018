const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = process.env.port || '3000';

app.listen(port, () => console.log(`API running on port ${port}`));