
import Book from "../../model/Book.js";
import Genre from "../../model/Genre.js";


export const genre = async (req, res) => {
  try {
    const check = await Genre.findOne({ title: req.body.title });
    if (check) {
      return res.status(400).json({ code: 400, message: "Title already exists." });
    } else {
      const newGenre = await Genre.create({
        title: req.body.title
      });
      if (newGenre) {
        return res.status(200).json({ genre: newGenre, code: 200, message: "Genre Created Successfully" });
      } else {
        return res.status(400).json({ code: 400, message: "Genre does not Created Successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};
//get books
export const getAllGenres = async (req, res) => {
  try {
    // Retrieve all genres from the database
    const genres = await Genre.find();
    
    // Return the list of genres
    return res.status(200).json({ genres, code: 200, message: "Genres retrieved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};


//create BOOKS


export const createBook = async (req, res) => {


  try {
    const { title, authorName, publicationHouse, publicationDate, genre, publicationYear } = req.body;
   const  uid=req.details.id;

    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).json({ message: "Book with the same title already exists" });
    }

  
    const newBook = new Book({
      title,
      authorName,
      publicationHouse,
      publicationDate,
      genre,
      publicationYear,
       uid,
      status: "plan to read" 
    });

  
    await newBook.save();

    return res.status(201).json({ book: newBook, message: "Book created successfully" });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get all books
export const getAllBooksByUserId = async (req, res) => {
  try {
    const uid = req.details.id;
  
    const books = await Book.find({ uid }).populate('genre');
    return res.status(200).json({ books });
  } catch (error) {
    console.error("Error retrieving books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//update
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, authorName, publicationHouse, publicationDate, genre, publicationYear, status } = req.body;


    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

 
    if (title !== book.title) {
      const existingBook = await Book.findOne({ title });
      if (existingBook) {
        return res.status(400).json({ message: "Book with the same title already exists" });
      }
    }

    book.title = title || book.title;
    book.authorName = authorName || book.authorName;
    book.publicationHouse = publicationHouse || book.publicationHouse;
    book.publicationDate = publicationDate || book.publicationDate;
    book.genre = genre || book.genre;
    book.publicationYear = publicationYear || book.publicationYear;
    book.status = status || book.status;

    const updatedBook = await book.save();

    return res.status(200).json({ book: updatedBook, message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// delete books


export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params; 
    const uid = req.details.id; 

   
    const book = await Book.findOne({ _id: id, uid });
    if (!book) {
      return res.status(404).json({ message: "Book not found or you are not authorized to delete this book" });
    }

    await Book.deleteOne({ _id: id });

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// GETbOOKS BY STATUS
export const getBooksByStatus = async (req, res) => {
  try {
    const { status } = req.query; 
    let query = {};

  
    if (status) {
      query.status = status;
    }

    const books = await Book.find(query).populate('genre');
    
    return res.status(200).json({ books });
  } catch (error) {
    console.error("Error getting books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
