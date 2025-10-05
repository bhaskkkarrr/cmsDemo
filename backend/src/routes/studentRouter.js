const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const studentController = require("../controllers/studentController");
const studentRouter = express.Router();

studentRouter.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  studentController.postAddStudent
);

studentRouter.get(
  "/students",
  verifyToken,
  authorizeRoles("admin"),
  studentController.getAllStudents
);

studentRouter.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  studentController.deleteStudent
);

exports.studentRouter = studentRouter;
