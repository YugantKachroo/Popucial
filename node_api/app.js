const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

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

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', postRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on ${port}`));
