const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const classController = require("../controllers/classController");

const classRouter = express.Router();

classRouter.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  classController.postCreateClass
);

classRouter.get(
  "/classes",
  verifyToken,
  authorizeRoles("admin"),
  classController.getAllClasses
);

classRouter.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  classController.deleteClass
);

classRouter.put(
  "/update/:id",
  verifyToken,
  authorizeRoles("admin"),
  classController.updateClass
);
exports.classRouter = classRouter;
