const DBMock = [
  {
    id: 1,
    thumbnail: 'http://cf.geekdo-images.com/images/pic175966_t.jpg',
    image: 'http://cf.geekdo-images.com/images/pic175966.jpg',
    name: 'Arkham Horror',
    description: 'The year is 1926... ',
    year: 2005,
    minplayers: 1,
    maxplayers: 8,
    minplaytime: 120,
    maxplaytime: 240,
    minage: 12,
    categories: ['Adventure', 'Fantasy'],
    mechanics: ['Dice rolling', 'Hand management'],
    score: 7.41
  }, {
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
  }
];

export default function loadFromBGG(req) {
  return Promise.resolve([]);
}
