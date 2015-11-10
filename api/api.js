require('../server.babel'); // babel registration (runtime transpilation for node)

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import mongoose from 'mongoose';

const pretty = new PrettyError();
const app = express();

mongoose.connect(config.mongoUri);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

app.get('/v1/boardgames', (req, res, next) => {
  req.url = '/boardgames/loadFromDB';
  next();
});

app.post('/v1/boardgames', (req, res, next) => {
  req.url = '/boardgames/addBoardgameToDB';
  req.body = {
    id: 2,
    thumbnail: 'http://cf.geekdo-images.com/images/pic158548_t.jpg',
    image: 'http://cf.geekdo-images.com/images/pic158548.jpg',
    name: 'Puerto Rico',
    description: 'In Puerto Rico... ',
    year: 2002,
    minplayers: 2,
    maxplayers: 5,
    minplaytime: 90,
    maxplaytime: 150,
    minage: 12,
    categories: ['Economic', 'City building'],
    mechanics: ['Variable phase order'],
    score: 8.14
  };
  next();
});

app.use((req, res) => {

  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        res.json(result);
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

if (config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', (process.env.HOST || 'localhost'), config.apiPort);
  });

} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
