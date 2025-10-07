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

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());
app.use(cors());
// {
//   origin: "cms-demo-murex.vercel.app",
//   credentials: true,
// }
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
