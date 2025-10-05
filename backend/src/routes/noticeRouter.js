const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const noticeController = require("../controllers/noticeController");

// Notice Router
const noticeRouter = express.Router();

noticeRouter.post(
  "/add",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  noticeController.postAddNotice
);
noticeRouter.get(
  "/notices",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  noticeController.getAllNotices
);
noticeRouter.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  noticeController.deleteNotice
);

exports.noticeRouter = noticeRouter;
