const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    default: "absent",
  },
  date: {
    type: Date,
    required: true,
  },
  attendance_code: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Attendance", attendanceSchema);
