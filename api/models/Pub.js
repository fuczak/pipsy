import mongoose from 'mongoose';

export default mongoose.Schema({ // eslint-disable-line
  name: {
    type: String,
    unique: true,
    required: true
  },
  addressStreet: String,
  addressNumber: Number,
  openingHours: {
    Mon: [Number],
    Tue: [Number],
    Wed: [Number],
    Thu: [Number],
    Fri: [Number],
    Sat: [Number],
    Sun: [Number],
  },
  boardgames: [mongoose.Schema.Types.ObjectId]
});
