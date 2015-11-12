import mongoose from 'mongoose';

const pubSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  boardgames: [mongoose.Schema.Types.ObjectId]
});

export default mongoose.model('Pub', pubSchema);
