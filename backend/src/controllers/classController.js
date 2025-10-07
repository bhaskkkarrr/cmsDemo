const Class = require("../models/classModel");

exports.postCreateClass = async (req, res) => {
  console.log("Backend request: ", req.body);
  const { class_text, class_name, class_teacher, section, capacity, room } =
    req.body;

  try {
    const errors = [];

    // Check for duplicate class_text
    const existingClass = await Class.findOne({ class_text });
    if (existingClass) {
      errors.push({
        field: "class_text",
        message: "Class text must be unique",
      });
    }

    // Check for room occupancy
    const occupiedRoom = await Class.findOne({ room });
    if (occupiedRoom) {
      errors.push({
        field: "room",
        message: "This room is already assigned to another class",
      });
    }

    // If any errors, return them all
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Create new class
    const newClass = new Class({
      college_id: req.user.id,
      class_text,
      class_name,
      class_teacher,
      section,
      capacity,
      room,
    });

    await newClass.save();

    res
      .status(201)
      .json({ success: true, message: "Class created successfully", newClass });
  } catch (e) {
    console.error("Error creating class:", e);
    res.status(500).json({
      success: false,
      message: "Server error in creating class",
      error: e.message,
    });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const { id } = req.user;
    const classes = await Class.find({ college_id: id });
    if (!classes || classes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No classes added yet",
      });
    }

    res.status(200).json({
      success: true,
      message: "All classes fetched successfully",
      classes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching classes",
      error: error.message,
    });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletingClass = await Class.findById(id);

    if (!deletingClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not available" });
    }

    await deletingClass.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting class",
      error: error.message,
    });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params; // Class ID from URL
    const { class_name, class_text, class_teacher, section, capacity, room } =
      req.body;

    const errors = [];

    // Check if class_text is unique (excluding the current class)
    const existingClass = await Class.findOne({ class_text, _id: { $ne: id } });
    if (existingClass) {
      errors.push({
        field: "class_text",
        message: "Class text must be unique",
      });
    }

    // Check if room is occupied (excluding the current class)
    if (room) {
      const occupiedRoom = await Class.findOne({ room, _id: { $ne: id } });
      if (occupiedRoom) {
        errors.push({
          field: "room",
          message: "This room is already assigned to another class",
        });
      }
    }

    // Return all validation errors if any
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Find the class and update
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { class_name, class_text, class_teacher, section, capacity, room },
      { new: true } // returns the updated document
    );

    if (!updatedClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Class updated", updatedClass });
  } catch (error) {
    console.error("Error updating class:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while updating class",
        error,
      });
  }
};
