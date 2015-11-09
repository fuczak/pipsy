import request from 'request';
import { parseString } from 'xml2js';

function filterAndMapLinks(element, type) {
  if (Array.isArray(element.link)) {
    return element.link.filter((currentLinkElement) => {
      return currentLinkElement.$.type === type;
    }).map((currentFilteredElement) => {
      return currentFilteredElement.$.value;
    });
  }
}

export default function getOneFromBGG(req) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.boardgamegeek.com/xmlapi2/thing?id=${req.query.q}&stats=1`,
      timeout: 5000
    }, (error, response, body) => {
      if (error) reject(error);
      parseString(body, (err, res) => {
        if (err) reject(err);
        const el = res.items.item[0];
        resolve({
          id: el.$.id,
          thumbnail: el.thumbnail[0],
          image: el.image[0],
          name: el.name[0].$.value,
          description: el.description[0],
          year: el.yearpublished ? Number(el.yearpublished[0].$.value) : 0,
          minplayers: el.minplayers[0].$.value,
          maxplayers: el.maxplayers[0].$.value,
          minplaytime: el.minplaytime[0].$.value,
          maxplaytime: el.maxplaytime[0].$.value,
          minage: el.minage[0].$.value,
          categories: filterAndMapLinks(el, 'boardgamecategory'),
          mechanics: filterAndMapLinks(el, 'boardgamemechanic'),
          score: Math.round(el.statistics[0].ratings[0].average[0].$.value * 100) / 100
        });
      });
    });
  });
}
