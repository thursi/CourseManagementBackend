const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  instructor: String,
  instructorId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  enrolledStudents: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);
