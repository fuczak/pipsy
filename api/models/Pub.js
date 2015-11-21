import mongoose from 'mongoose';

export default mongoose.Schema({ // eslint-disable-line
  name: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    street: String,
    number: Number,
    lat: Number,
    lon: Number
  },
  openingHours: {
    mon: [Number],
    tue: [Number],
    wed: [Number],
    thu: [Number],
    fri: [Number],
    sat: [Number],
    sun: [Number],
  },
  boardgames: [mongoose.Schema.Types.ObjectId]
});
