const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const sessions = require('express-session');
const MySQLStore = require('express-mysql-session')(sessions);
const path = require('path');
require('dotenv').config();
const pool = require('./service/dbConnection');
const sessionOptions = require('./service/sessionOptions');

//APP.USE
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MySQLStore({ sessionOptions }, pool);

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
  if (req.session.loggedIn === true) {
    res.sendFile(path.join(__dirname, 'public', 'shop.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  }
});

app.get('/shop', (req, res) => {
  if (req.session.loggedIn === true) {
    res.sendFile(path.join(__dirname, 'public', 'shop.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

const loginCheck = require('./controller/loginCheck');
app.post('/loginCheck', loginCheck);

const customerShop = require('./controller/customerShop');
app.get('/customerShop', customerShop);

const categories = require('./controller/categories');
app.get('/categories/:id', categories);

const addproducts = require('./controller/addProduct');
app.post('/addproduct', addproducts);

const deleteProduct = require('./controller/deleteProduct');
app.delete('/deleteProduct', deleteProduct);

const createUser = require('./controller/createUser');
app.post('/createUser', createUser);

app.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    res.status(200).redirect('/');
  });
});

// LISTEN ON PORT .ENV || 3000
app.listen(port, () => console.info(`-> Server is listening on port ${port}`));
