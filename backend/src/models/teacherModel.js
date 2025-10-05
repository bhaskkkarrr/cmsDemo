const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  address: {
    type: String,
  },
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
  subjects: {
    type: [String],
  },
  experience: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // teacher_img: String,
});
module.exports = mongoose.model("Teacher", teacherSchema);
