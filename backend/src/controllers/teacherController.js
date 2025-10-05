const Teacher = require("../models/teacherModel");

exports.postAddTeacher = async (req, res) => {
  console.log("Logged in user Info", req.user);
  console.log("Server side adding teacher", req.body);
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
      department,
      designation,
      experience,
      subjects,
    } = req.body;
    const newTeacher = new Teacher({
      college_id: req.user.id,
      first_name,
      last_name,
      gender,
      email,
      password,
      dob,
      contact_number,
      address,
      department,
      designation,
      experience,
      subjects,
    });
    await newTeacher.save();
    res.status(200).json({ success: true, message: "Teacher craeted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error in adding teacher",
    });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const { id } = req.user;
    const teachers = await Teacher.find({ college_id: id }).select(
      "-password -college_id -__v -createdAt"
    );

    if (teachers) {
      res.status(200).json({ message: "All Teachers", teachers });
    } else {
      res.status(402).json({ message: "No teachers are registered" });
    }
  } catch (e) {
    res.status(500).json({ success: "false", message: e.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID ", id);
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      res.status(401).json({ success: false, message: "No teacher founded" });
    }
    await Teacher.deleteOne();
    res.status(200).json({ success: true, message: "Teacher Deleted" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
