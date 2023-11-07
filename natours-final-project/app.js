const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from there!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('Start posting right now!');
});

app.listen(port, () => {
  console.log('Go go go');
});
