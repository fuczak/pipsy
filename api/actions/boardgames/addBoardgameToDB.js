import Boardgame from '../../models/Boardgame';

export default function addBoardgameToDB(req) {
  const {id, thumbnail, image, name, description, year, minplayers, maxplayers, minplaytime, maxplaytime, minage, categories, mechanics, score} = req.body;
  const boardgame = new Boardgame({
    id,
    thumbnail,
    image,
    name,
    description,
    year,
    minplayers,
    maxplayers,
    minplaytime,
    maxplaytime,
    minage,
    categories,
    mechanics,
    score
  });

  return boardgame.save((err) => {
    return err ? Promise.reject() : Promise.resolve();
  });
}
