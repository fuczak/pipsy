import request from 'request';
import { parseString } from 'xml2js';

export default function loadFromBGG(req) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.boardgamegeek.com/xmlapi2/search?query=${req.query.q}&type=boardgame`,
      timeout: 10000
    }, (error, response, body) => {
      if (error) reject(error);
      parseString(body, (err, res) => {
        if (err) reject(err);
        if (Array.isArray(res.items.item)) {
          resolve(res.items.item
            .map((el) => {
              return {
                bggid: el.$.id,
                type: el.$.type,
                name: el.name[0].$.value,
                year: el.yearpublished ? Number(el.yearpublished[0].$.value) : 0
              };
            })
            .filter((el) => {
              return el.type === 'boardgame';
            })
            .sort((prev, current) => {
              // TODO: Should the items be sorted by year?
              // return current.year - prev.year;
            }));
        } else {
          resolve([]);
        }
      });
    });
  });
}
