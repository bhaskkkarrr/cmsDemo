const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  subject_name: {
    type: String,
  },
  subject_code: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
});
module.exports = mongoose.model("Subject", subjectSchema);