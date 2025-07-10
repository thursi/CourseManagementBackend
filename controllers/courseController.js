const Course = require("../models/Course");

// http://localhost:5000/api/courses

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

// http://localhost:5000/api/courses
// {
//   "title": "Web Development",
//   "description": "Learn the fundamentals of web development including HTML, CSS, and JavaScript",
//   "content": "This comprehensive course covers basic web development concepts...",
//   "instructor": "John John",
//   "instructorId": "507f1f77bcf86cd799439012"
// }

exports.createCourse = async (req, res) => {
  try {
    const { title, description, content, instructor, instructorId } = req.body;

    const course = await Course.create({
      title,
      description,
      content,
      instructor,
      instructorId,
      createdAt: new Date(),
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("❌ Error creating course:", error); // Add this line
    res.status(500).json({ message: "Failed to create course" });
  }
};

// {
//   "title": "Introduction to App Development",
//   "description": "Learn the fundamentals of web development including HTML, CSS, and JavaScript",
//   "content": "This comprehensive course covers basic web development concepts...",
//   "instructor": "John Doe",
//   "instructorId": "507f1f77bcf86cd799439011"
// }
//localhost:5000/api/courses/686beee23af50584c2afc998 this is course id

// exports.updateCourse = async (req, res) => {
//   try {
//     const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updated);
//   } catch (error) {
//     res.status(400).json({ message: "Error updating course" });
//   }
// };

exports.updateCourse = async (req, res) => {
  try {
    console.log("Updating course id:", req.params.id);
    console.log("Update data:", req.body);

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Course not found" });
    }

    console.log("Updated course:", updated);
    res.json(updated);
  } catch (error) {
    console.error("Error updating course:", error);
    res
      .status(400)
      .json({ message: "Error updating course", error: error.message });
  }
};

//localhost:5000/api/courses/686bf6c53af50584c2afc99c

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting course" });
  }
};

// http://localhost:5000/api/courses/686beee23af50584c2afc998/enroll
// {
//   "studentId": "686c08c48d00a84d71a62302"
// }
//need Content-Type: application/json
// Authorization: Bearer <JWT_TOKEN>

exports.enrollInCourse = async (req, res) => {
  const { studentId } = req.body;
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!studentId) {
      return res
        .status(400)
        .json({ message: "Missing studentId in request body" });
    }

    if (!course.enrolledStudents.includes(studentId)) {
      course.enrolledStudents.push(studentId);
      await course.save();
    }

    res.json(course);
  } catch (error) {
    console.error("❌ Enrollment error:", error);
    res
      .status(400)
      .json({ message: "Enrollment failed", error: error.message });
  }
};
