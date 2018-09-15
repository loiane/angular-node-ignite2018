const express = require('express');
const bodyParser = require('body-parser');
// const routes = require('./src/routes');
const app = express();
const port = process.env.port || '8626';
const env = process.env.NODE_ENV || 'dev';
const publicweb = './dist';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/api', routes);

app.get('/', (req, res) => res.send('Hello World!'))

if (env !== 'dev') {
  app.use(express.static(publicweb));
  console.log(`serving ${publicweb}`);
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './dist' });
  });
}

app.listen(port, () => console.log(`API running on port ${port}`));
