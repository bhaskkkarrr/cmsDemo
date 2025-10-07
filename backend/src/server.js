const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");

// Routers Import
const { authRouter } = require("./routes/authRouter");
const { userRouter } = require("./routes/userRouter");
const { teacherRouter } = require("./routes/teacherRouter");
const { studentRouter } = require("./routes/studentRouter");
const { noticeRouter } = require("./routes/noticeRouter");
const { classRouter } = require("./routes/classRouter");

// Connect to the database
dbConnect();
dbConnect()
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Proper CORS configuration
app.use(
  cors({
    origin: "https://cms-demo-murex.vercel.app", // include the full URL with https
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);
app.use("/api/notice", noticeRouter);
app.use("/api/class", classRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
