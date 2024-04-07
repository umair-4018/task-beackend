import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;
