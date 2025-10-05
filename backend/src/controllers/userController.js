const express = require("express");
const Admin = require("../models/adminModel");

exports.getSchool = async (req, res) => {
  // console.log("Logged in School data", req.user);
  try {
    // console.log("Logged in School data", req.user);
    const { email } = req.user;
    const school = await Admin.findOne({ email }).select("-password");
    if (!school) {
      res.status(402).json({ message: "No schoool exists" });
    } else {
      console.log("School", school);
      res.status(200).json({ message: "School Found", school });
    }
  } catch (e) {
    res.status(500).json({ success: "false", message: "Error" });
  }
};

exports.getTeacher = (req, res) => {
  console.log("User teacher");
};

exports.getStudent = (req, res) => {
  console.log("User student");
};
