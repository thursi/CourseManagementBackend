const Course = require("../models/Course");

// @desc    Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

// @desc    Create new course
exports.createCourse = async (req, res) => {
  const { title, description, content, instructor, instructorId } = req.body;
  try {
    const newCourse = new Course({
      title,
      description,
      content,
      instructor,
      instructorId,
    });
    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating course" });
  }
};

// @desc    Update course
exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating course" });
  }
};

// @desc    Delete course
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting course" });
  }
};

// @desc    Enroll student
exports.enrollInCourse = async (req, res) => {
  const { studentId } = req.body;
  try {
    const course = await Course.findById(req.params.id);
    if (!course.enrolledStudents.includes(studentId)) {
      course.enrolledStudents.push(studentId);
      await course.save();
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: "Enrollment failed" });
  }
};
