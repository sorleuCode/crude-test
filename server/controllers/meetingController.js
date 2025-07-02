const Meeting = require("../models/Meeting");

exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ user: req.user.id });
    res.json(meetings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch meetings" });
  }
};

exports.createMeeting = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newMeeting = new Meeting({
      title,
      description,
      date,
      user: req.user.id,
    });

    const saved = await newMeeting.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create meeting" });
  }
};

exports.updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    const updated = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update meeting" });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    await Meeting.findByIdAndDelete(req.params.id);

    res.json({ message: "Meeting deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete meeting" });
  }
};
