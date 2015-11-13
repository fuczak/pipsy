import mongoose from 'mongoose';

export default mongoose.Schema({ // eslint-disable-line
  name: {
    type: String,
    unique: true,
    required: true
  },
  boardgames: [mongoose.Schema.Types.ObjectId]
});
