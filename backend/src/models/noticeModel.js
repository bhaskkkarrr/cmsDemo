const mongoose = require("mongoose");
const noticeSchema = new mongoose.Schema({
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  submitted_by: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Teacher",
    required: true,
  },
  submitted_on: {
    type: String,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Notice", noticeSchema);
