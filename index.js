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
// swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// to serve static files from public directory
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// swagger API documentation
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Bad Bank API",
      description: "Bad Bank Web Application API Docs",
      version: "1.0.0",
      contact: {
        name: "Sun Chung",
        email: "chungsun.dev@gmail.com"
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        }
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
      },{
        url: "http://44.210.131.94:3000"
      },
    ]
  },
  apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// token authentication middleware
function authenticateToken (req, res, next) {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    res.status(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, _id) => {
    if (err) {
      res.status(403)
    }
    req._id = _id;
    next();
  })
};

// home or root directory
app.get('/', (req, res) => {
  res.send();
});

/**
 * @swagger
 * tags:
 *  name: Bad Bank
 *  description: Bad Bank API's
 */

/**
 * @swagger
 * /api/accounts/users/createaccount/{name}/{email}/{password}:
 *  get:
 *    summary: This API is used to create user account
 *    tags: [Bad Bank]
 *    description: Use it to create user account
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: name
 *        required: true
 *        description: User name required
 *        schema:
 *          type: string
 *      - in: path
 *        name: email
 *        required: true
 *        description: User email required
 *        schema:
 *          type: string
 *      - in: path
 *        name: password
 *        required: true
 *        description: User password required
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        descriptions: Success
 */
// to create user account
app.get('/api/accounts/users/createaccount/:name/:email/:password', async (req, res) => {
  
  const hashedPassword = await bcrypt.hash(req.params.password, 10);
  
  dal.create(req.params.name, req.params.email, hashedPassword)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

/**
 * @swagger
 * /api/accounts/users/login/{email}/{password}:
 *  get:
 *    summary: This API is used to login a user
 *    tags: [Bad Bank]
 *    description: Use it to login a user
 *    parameters:
 *      - in: path
 *        name: email
 *        required: true
 *        description: User email required
 *        schema:
 *          type: string
 *      - in: path
 *        name: password
 *        required: true
 *        description: User password required
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        descriptions: Success
 */
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
              const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 120 })
              res.send({...user, accessToken});
            } else {
              console.log('Incorrect email address or password');
              res.status(401).send('Incorrect email address or password');
            }
          })
      }
    });
});

/**
 * @swagger
 * /api/accounts/users/finduser/{email}:
 *  get:
 *    summary: This API is used to find a user
 *    tags: [Bad Bank]
 *    description: Use it to find a user
 *    parameters:
 *      - in: path
 *        name: email
 *        required: true
 *        description: User email required
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        descriptions: Success
 */
// find user
app.get('/api/accounts/users/finduser/:email', (req, res) => {
  dal.findUser(req.params.email)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

/**
 * @swagger
 * /api/accounts/users/transactions:
 *  post:
 *    summary: This API is used to make transactions
 *    tags: [Bad Bank]
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    security:
 *      - basicAuth: []
 *    parameters:
 *      - in: formData
 *        name: email
 *        type: string
 *      - in: formData
 *        name: amount
 *        type: number
 *      - in: header
 *        name: Authorization
 *        type: apiKey
 *    description: Use it to make transactions
 *    responses:
 *      200:
 *        descriptions: Success
 *      401:
 *        descriptions: User not authenticated
 *      403:
 *        descriptions: User not authorized
 */
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
app.post('/api/account/users/settings', authenticateToken, (req, res) => {
  
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

/**
 * @swagger
 * /api/accounts/users/displayAllAccounts:
 *  get:
 *    summary: This API is used to find all users
 *    tags: [Bad Bank]
 *    description: Use it to find all users
 *    responses:
 *      200:
 *        descriptions: Success
 */

// to display all users account
app.get('/api/accounts/users/displayAllAccounts', function (req, res) {
  dal.all ()
    .then((users) => {
      console.log(users);
      res.send(users);
    });
});

/**
 * @swagger
 * /api/accounts/users/deleteAllAccounts:
 *  delete:
 *    summary: This API is used to find a user
 *    tags: [Bad Bank]
 *    description: Use it to find a user
 *    responses:
 *      200:
 *        descriptions: Success
 */

// to delete all users account
app.delete('/api/accounts/users/deleteAllAccounts', function (req, res) {
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