const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const teacherController = require("../controllers/teacherController");
const teacherRouter = express.Router();

teacherRouter.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  teacherController.postAddTeacher
);

teacherRouter.get(
  "/teachers",
  verifyToken,
  authorizeRoles("admin"),
  teacherController.getAllTeachers
);

teacherRouter.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  teacherController.deleteTeacher
);

exports.teacherRouter = teacherRouter;
