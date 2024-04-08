import express from "express";
import authRoute from "./auth/auth.js";
import verifyTokens from "../middleware/index.js";
import { createBook, deleteBook, genre, getAllBooksByUserId, getAllGenres, updateBook } from "../controller/bookController/BookController.js";
import { deleteUserAndBooks } from "../controller/authController/AuthController.js";

const router = express.Router();
router.use("/auth",authRoute)
router
  .post('/genre', genre)
  .delete("/delete-user-books",verifyTokens,deleteUserAndBooks)
  .get('/get-genre', getAllGenres)
  .post('/create-book',verifyTokens, createBook)
  .get('/get-books',verifyTokens, getAllBooksByUserId)
  .put('/update-book/:id', verifyTokens,updateBook)
  .delete('/delete-book/:id',verifyTokens,deleteBook)

export default router;