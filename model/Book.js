
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  publicationHouse: {
    type: String
  },
  publicationDate: {
    type: Date
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre"
  },
  publicationYear: {
    type: Number
  },
  uid: {
    type:String
   },

  status: {
    type: String,
   required:true
  }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
