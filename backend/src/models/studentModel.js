const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  // teacher_img: String,
  roll_number: {
    type: String,
    unique: true,
    required: true,
  },
  section: {
    type: String,
  },
  course: {
    type: String,
  },
  admission_year: {
    type: Number,
  },
  current_status: {
    type: String,
    enum: ["Active", "Graduated", "Dropped", "Suspended", "Transferred"],
    default: "Active",
  },
  father_name: {
    type: String,
  },
  mother_name: {
    type: String,
  },
  father_number: {
    type: String,
  },
  mother_number: {
    type: String,
  },
  guardian_name: {
    type: String,
  },
  guardian_number: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Student", studentSchema);
