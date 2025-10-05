const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");
const userRouter = express.Router();

// Admin Routes
userRouter.get(
  "/admin",
  verifyToken,
  authorizeRoles("admin"),
  userController.getSchool
);

// Teacehr Routes
userRouter.get(
  "/teacher",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  userController.getTeacher
);

// Student Routes
userRouter.get(
  "/student",
  verifyToken,
  authorizeRoles("admin", "student"),
  userController.getStudent
);

exports.userRouter = userRouter;
