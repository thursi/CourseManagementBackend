const express = require("express");
const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
} = require("../controllers/courseController");

const router = express.Router();

// CRUD Routes
router.get("/", getCourses);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

// Enroll route
// router.post("/:id/enroll", enrollInCourse);
//id is course id

const verifyToken = require("../middleware/verifyToken");
router.post("/:id/enroll", verifyToken, enrollInCourse);

module.exports = router;
