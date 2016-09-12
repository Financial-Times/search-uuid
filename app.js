// server side

require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const winston = require('winston');
const compression = require('compression');
const fetch = require('node-fetch');
// const bodyParser = require('body-parser');

const app = express();

function findUserInfo(uuid, auth) {
  return fetch(`http://localhost:1337/users/${uuid}`, { // calls email-users-lists API
    method: 'GET',
    headers: {
      Authorization: auth,
    },
  });
}

app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// app.use(bodyParser.urlencoded());
app.use(compression());
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', (req, res) => {
  findUserInfo(req.query.uuid, process.env.AUTH)
  .then((userResponse) => {
    if (!userResponse.ok) {
      throw new Error('Error of some sort');
    }
    return userResponse.json(); // headers etc
  })
  .then((body) => {
    console.log(body); // actual response body
    res.json(body);
  })
  .catch((err) => {
    // console.log(err);
    res.status(404).send(err.message);
  });
});

app.listen(3000, () => {
  winston.info('magic happens on port 3000');
});
