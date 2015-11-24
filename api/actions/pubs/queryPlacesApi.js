import request from 'request';
import config from '../../../src/config';

const key = config.gpapi;

export default function queryPlacesApi(req) {
  const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + req.query.q + '&key=' + key;
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
