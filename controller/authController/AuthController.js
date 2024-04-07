import dotenv from 'dotenv';
dotenv.config();
var secret = process.env.SECRET;
import User from "../../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Book from '../../model/Book.js';


export const authRegister = async (req, res) => {
  try {
    const check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ code: 400, message: "Email already exists." });
    } else {
      let hashPassword = bcrypt.hashSync(req.body.password, 8);
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });
      if (newUser) {
        return res.status(200).json({ user: newUser, code: 200, message: "User Created Successfully" });
      } else {
        return res.status(400).json({ code: 400, message: "User does not Created Successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};
  //login
  export const authLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ code: 400, message: "Incorrect email." });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          secret,
          {
            expiresIn: '24h', // expires in 24 hours
          }
        );
        return res.status(200).json({
          code: 200,
          message: "Login Successfully.",
          token,
          userInfo: user,
        });
      } else {
        return res.status(400).json({ code: 400, message: "Incorrect password." });
      }
    } catch (error) {
      console.error(error); // Use console.error for error logging
      return res.status(500).json({ code: 500, message: "Internal server error." });
    }
  };

  export const deleteUserAndBooks = async (req, res) => {
    try {
      // Check if req.details is defined and has _id property
      if (!req.details || !req.details.id) {
        return res.status(400).json({ message: "User details are missing or invalid" });
      }
  
      // Delete all books associated with the user
      await Book.deleteMany({ uid: req.details.id });
  
      // Delete the user
      await User.findByIdAndDelete(req.details.id);
  
      return res.status(200).json({ message: "User and associated books deleted successfully" });
    } catch (error) {
      console.error("Error deleting user and books:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  



  
  


  