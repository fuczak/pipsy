require('../server.babel'); // babel registration (runtime transpilation for node)

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import config from '../src/config';
import * as actions from './actions/index';
import mongoose from 'mongoose';
import restful from 'node-restful';
import Pub from './models/Pub';
import Boardgame from './models/Boardgame';

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

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

const Pubs = app.resource = restful.model('pub', Pub).methods(['get', 'post', 'delete']);
Pubs.route('places.get', (req, res) => {
  actions.pubs.queryPlacesApi(req).then((data) => {
    res.send(data);
  });
});
Pubs.register(app, '/pubs');

const Boardgames = app.resource = restful.model('boardgame', Boardgame).methods(['get', 'post']);
Boardgames.route('bgg.get', (req, res) => {
  actions.boardgames.loadFromBGG(req).then((data) => {
    res.send(data);
  });
});
Boardgames.route('bggone.get', (req, res) => {
  actions.boardgames.getOneFromBGG(req).then((data) => {
    res.send(data);
  });
});
Boardgames.register(app, '/boardgames');

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
