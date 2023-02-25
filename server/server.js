require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes.js');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
// app.use() redis
app.use('/db', router);
// app.use(express.static('../client/dist'));

app.get(`/${process.env.LOADER_IO}`, (req, res) => {
  res.send(process.env.LOADER_IO)
})

// app.get('/client', (req, res) => {
//   const fromData = new Date();
//   oldCount++;
//   const client = new Client
// })


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
