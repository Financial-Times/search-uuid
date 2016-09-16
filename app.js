require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const winston = require('winston');
const compression = require('compression');
const fetch = require('node-fetch');

const app = express();

function findUserInfo(uuid, auth) {
  return fetch(`http://localhost:1337/users/${uuid}`, {
    method: 'GET',
    headers: {
      Authorization: auth,
    },
  });
}

function unsubscribeUser(userUuid, listId, auth) {
  return fetch(`http://localhost:1337/users/${userUuid}/lists/${listId}`, {
    method: 'DELETE',
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
    return userResponse.json();
  })
  .then((body) => {
    res.json(body);
  })
  .catch((err) => {
    res.status(404).send(err.message);
  });
});

app.post('/users', (req, res) => {
  unsubscribeUser(req.query.uuid, req.query.listId, process.env.AUTH)
  .then((userResponse) => {
    if (!userResponse.ok) {
      throw new Error('Error of some sort');
    }
    return userResponse.json();
  })
  .then((body) => {
    res.json(body);
  })
  .catch((err) => {
    res.status(404).send(err.message);
  });
});

app.listen(3000, () => {
  winston.info('magic happens on port 3000');
});
