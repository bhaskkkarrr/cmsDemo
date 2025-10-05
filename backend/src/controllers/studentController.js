const Student = require("../models/studentModel");

exports.postAddStudent = async (req, res) => {
  console.log("Logged in user Info", req.user);
  console.log("Server side adding student", req.body);
  try {
    const {
      first_name,
      last_name,
      gender,
      email,
      password,
      dob,
      contact_number,
      address,
      roll_number,
      section,
      course,
      admission_year,
      current_status,
      father_name,
      mother_name,
      father_number,
      mother_number,
      guardian_name,
      guardian_number,
    } = req.body;
    const newStudent = new Student({
      college_id: req.user.id,
      first_name,
      last_name,
      gender,
      email,
      password,
      dob,
      contact_number,
      address,
      roll_number,
      section,
      course,
      admission_year,
      current_status,
      father_name,
      mother_name,
      father_number,
      mother_number,
      guardian_name,
      guardian_number,
    });
    await newStudent.save();
    res.status(200).json({ success: true, message: "Student created" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error in creating student",
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const { id } = req.user;
    const students = await Student.find({ college_id: id }).select(
      "-password -college_id -__v -createdAt"
    );

    if (students) {
      res.status(200).json({ message: "All students", students });
    } else {
      res.status(402).json({ message: "No students are registered" });
    }
  } catch (e) {
    res.status(500).json({ success: "false", message: e.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID ", id);
    const student = await Student.findById(id);
    if (!student) {
      res.status(401).json({ success: false, message: "No student founded" });
    }
    await student.deleteOne();
    res.status(200).json({ success: true, message: "student Deleted" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
