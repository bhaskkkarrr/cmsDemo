const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  class_text: {
    type: String,
    required: true,
    unique: true,
  },
  class_name: {
    type: String,
  },
  section: {
    type: String,
  },
  class_teacher: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Teacher",
    type: String,
  },
  capacity: {
    type: String,
  },
  studentsEnrolled: {
    type: Number,
    default: 0, // can increment as students are enrolled
  },
  room: {
    type: String,
    unique:true, // optional room number
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
classSchema.pre("save", function (next) {
  if (!this.class_name) {
    this.class_name = this.class_text;
  }
  next();
});
module.exports = mongoose.model("Class", classSchema);
