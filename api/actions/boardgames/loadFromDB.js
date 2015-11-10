import Boardgame from '../../models/Boardgame';

export default function loadFromBGG(req) {
  return Boardgame.find({
    name: new RegExp(req.query.q, 'i')
  }, (err, boardgames) => {
    if (err) Promise.reject();
    return Promise.resolve(boardgames);
  });
}
