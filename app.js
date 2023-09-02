require('dotenv').config();
const cors = require('cors');
const { 
  onServerStarted, 
  log, 
  error 
} = require('./src/helpers/logs.helper');

const express = require('express');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Mongoose Mongo DB init
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MDB_HOST)
  .then(() => log('Connected to Mongo/hainy DB'))
  .catch(() => error('Mongo/hainy DB connection failed'));

// Import external routes
const usersRouter = require('./src/routes/users/users.router');
const picturesRouter = require('./src/routes/storage/pictures/pictures.router');

// Plug-in routes by url
app.use('/users', usersRouter)
app.use('/storage/pictures', picturesRouter)

// Starting listening
const PORT = process.env.PORT;
app.listen(PORT, onServerStarted(PORT));