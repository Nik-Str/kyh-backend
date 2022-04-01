const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;
const sessions = require('express-session');
const MySQLStore = require('express-mysql-session')(sessions);
const path = require('path');
require('dotenv').config();
const pool = require('./dbConnection');

//APP.USE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //SESSION OPTIONS
const options = {
  host: process.env.DB_HOST,
  port: port,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
  createDatabaseTable: true,
  connectionLimit: 1,
  endConnectionOnClose: true,
  charset: 'utf8mb4_bin',
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
};

const sessionStore = new MySQLStore({ options }, pool);

app.use(
  sessions({
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    resave: false,
    store: sessionStore,
  })
);

// // PAGES
app.get('/', (req, res) => {
  console.log('asasd');
  if (req.session.loggedId === true) {
    res.sendFile(path.join(__dirname, 'public', 'shop.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  }
});

// LISTEN ON PORT .ENV || 3000
app.listen(port, () => console.info(`-> Server is listening on port ${port}`));

// //API
const loginCheck = require('./controller/loginCheck');
app.post('/login', loginCheck);

// const loginCheck = require('./controller/loginCheckTest');
// app.get('/control', loginCheck);
