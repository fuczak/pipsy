import request from 'request';
import config from '../../../src/config';

const key = config.gpapi;

export default function queryPlacesApi(req) {
  let url = undefined;

  if (req.query && req.query.q) {
    url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.q}&key=${key}`;
  } else if (req.query && req.query.id) {
    url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.query.id}&key=${key}`;
  } else {
    Promise.reject();
  }

  return new Promise((resolve, reject) => {
    request({
      url,
      timeout: 5000
    }, (error, response, body) => {
      if (error) reject(error);
      resolve(JSON.parse(body));
    });
  });
}
