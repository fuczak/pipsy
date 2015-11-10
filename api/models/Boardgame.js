import mongoose from 'mongoose';

const boardgameSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  thumbnail: String,
  image: String,
  name: String,
  description: String,
  year: Number,
  minplayers: Number,
  maxplayers: Number,
  minplaytime: Number,
  maxplaytime: Number,
  minage: Number,
  categories: [String],
  mechanics: [String],
  score: Number
});

export default mongoose.model('Boardgame', boardgameSchema);
