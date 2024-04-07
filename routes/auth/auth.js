

import express from "express";
import { authLogin, authRegister } from "../../controller/authController/AuthController.js";
const authRoute = express.Router();

authRoute
.post("/register",authRegister)
.post("/login",authLogin)


export default authRoute;