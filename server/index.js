const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/attendee.routes');

const app = express();
app.use(bodyParser.json());

app.use('/api', routes);

const port = process.env.port || '3000';

app.listen(port, () => console.log(`API running on port ${port}`));