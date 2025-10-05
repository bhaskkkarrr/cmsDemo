const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/login", authController.postLogin);
authRouter.post("/signup", authController.postSignup);

exports.authRouter = authRouter;
