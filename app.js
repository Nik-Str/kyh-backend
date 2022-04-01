const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;
const sessions = require('express-session');
const MySQLStore = require('express-mysql-session')(sessions);
const path = require('path');
require('dotenv').config();

//DB CONNECTION DETAILS
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
  timezone: 'Z',
});

//APP.USE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SESSION OPTIONS
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

// LISTEN ON PORT .ENV || 3000
app.listen(port, () => console.info(`-> Server is listening on port ${port}`));

// PAGES
app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});

const loginTest = require('./controller/loginTest');
app.post('/test', loginTest);

const loginCheck = require('./controller/loginCheckTest');
app.get('/control', loginCheck);
