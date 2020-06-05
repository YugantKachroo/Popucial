const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB Connected');
  });

mongoose.connection.on('error', (err) => {
  console.log('DB connection error: `${err.message}');
});

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized!' });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on ${port}`));
