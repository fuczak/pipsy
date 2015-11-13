import mongoose from 'mongoose';

export default mongoose.Schema({ // eslint-disable-line
  bggid: {
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
