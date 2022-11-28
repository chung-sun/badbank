// .env file
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// database utility
const dal = require('./dal.js');
// utility for hashing password
const bcrypt = require('bcrypt');
//jsonwebtoken
const jwt = require('jsonwebtoken');

// to serve static files from public directory
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// token authentication middleware
function authenticateToken (req, res, next) {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    res.status(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
    if (err) {
      res.status(403)
    }
    req.email = email;
    next();
  })
};

// home or root directory
app.get('/', (req, res) => {
  res.send();
});

// to create user account
app.get('/api/accounts/users/createaccount/:name/:email/:password', async (req, res) => {
  
  const hashedPassword = await bcrypt.hash(req.params.password, 10);
  
  dal.create(req.params.name, req.params.email, hashedPassword)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

// to login user
// token expires in 120 seconds
app.get('/api/accounts/users/login/:email/:password', async (req, res) => {

  dal.findUser(req.params.email)
    .then((user) => {
      if (user == null) {
        console.log('user not found');
        res.status(404).send('user not found');
      } else {
        bcrypt.compare(req.params.password, user.password)
          .then(function(result) {
            if (result) {
              console.log('verified user');
              console.log('user ', user);
              const accessToken = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 120 })
              res.send({...user, accessToken});
            } else {
              console.log('Incorrect email address or password');
              res.status(401).send('Incorrect email address or password');
            }
          })
      }
    });
});

// find user
app.get('/api/accounts/users/finduser/:email', (req, res) => {
  dal.findUser(req.params.email)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

// transaction
app.post('/api/accounts/users/transactions', authenticateToken, (req, res) => {
  //console.log(res.statusCode);
  
  if (res.statusCode == 403) {
    res.status(403).send('NOT AUTHORIZED USER');
  } else {
      try {
        dal.findUpdate(req.body.email, req.body.amount)
        .then((user) => {
          console.log(user);
          res.send(user);
        });
      } catch (error) {
        res.status(403).json({ error: error.toString() });
      }
    }
});

// update user settings
// /api/accounts/users/settings
app.post('/account/users/settings', authenticateToken, (req, res) => {
  
  if (res.statusCode == 403) {
    res.status(403).send('NOT AUTHORIZED USER');
  } else {
      try {
        dal.findUpdateUser(req.body.email, req.body.name)
        .then((user) => {
          console.log(user);
          res.send(user);
        });
      } catch (error) {
        res.status(403).json({ error: error.toString() });
      }
    }
});

// to display all users account
app.get('/api/accounts/users/displayAllAccounts', function (req, res) {
  dal.all ()
    .then((users) => {
      console.log(users);
      res.send(users);
    });
});

// to delete all users account
app.get('/api/accounts/users/deleteAllAccounts', function (req, res) {
  dal.deleteAll()
    .then((e) => {
      console.log(e);
      res.send(e);
    });
});

// running port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`)
});