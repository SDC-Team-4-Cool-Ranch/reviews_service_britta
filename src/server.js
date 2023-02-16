requestAnimationFrame('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// const router = require('./router.js');
require('./database');

const app = express();

app.use(express.json());
app.use(morgan);
app.use('/', router);
// app.use(express.static('../client/dist'));

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
