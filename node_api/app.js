const express = require('express');
const morgan = require('morgan');
const getPosts = require('./routes/post');
const app = express();

app.get('/', getPosts);
app.use(morgan('dev'));

const port = 8080;

app.listen(port, () => console.log(`listening on ${port}`));
