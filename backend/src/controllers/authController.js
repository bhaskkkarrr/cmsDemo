const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");

exports.postSignup = async (req, res) => {
  console.log("Received signup data:", req.body);
  const adminExists = await Admin.findOne({ email: req.body.email });
  if (adminExists) {
    return res.status(400).json({ message: "Already Registered, Go to Login" });
  } else {
    try {
      const { college_name, email, password, role } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newAdmin = new Admin({
        college_name,
        email,
        password: hashedPassword,
        role: role || "admin", // Default role is 'admin' if not provided
      });

      await newAdmin.save();
      res.status(201).json({ message: "College registered successfully" });
    } catch (err) {
      console.error("Error during signup:", err);
      res.status(500).json({ message: "Server error during signup" });
    }
  }
};

exports.postLogin = async (req, res) => {
  console.log("Received login data:", req.body);
  try {
    const { email, password } = req.body;

    // Finding user
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Checking password
    const isPasswordValid = bcrypt.compareSync(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generating JWT
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({ message: "Login successful", token, admin});
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
