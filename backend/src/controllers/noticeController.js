const Notice = require("../models/noticeModel");

exports.postAddNotice = async (req, res) => {
  try {
    console.log("Registered User: ", req.user);
    console.log("Submitted  Data: ", req.body);
    const { submitted_by, submitted_on, title, body } = req.body;

    const newNotice = new Notice({
      college_id: req.user.id,
      submitted_by,
      submitted_on,
      title,
      body,
    });

    await newNotice.save();
    res.status(200).json({ success: true, message: "Notice Added" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error in notice adding" });
  }
};

exports.getAllNotices = async (req, res) => {
  try {
    const { id } = req.user;
    const notices = await Notice.find({ college_id: id }).select(
      "-createdAt -college_id"
    );

    if (notices) {
      res.status(200).json({ success: true, message: "All notices", notices });
    } else {
      res.status(401).json({ message: "No notices available" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error in fetching notice" });
  }
};

exports.deleteNotice = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    if (!notice) {
      res.status(401).json({ success: false, message: "No teacher found" });
    }
    await Notice.deleteOne();
    res.status(200).json({ success: true, message: "Notice Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
