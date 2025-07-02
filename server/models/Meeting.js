const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);
