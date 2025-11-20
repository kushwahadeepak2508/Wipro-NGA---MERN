const express = require("express");
const router = express.Router();
const validateCourseId = require("../middleware/validateCourseId");
const courses = require("../data/courses.json");

// Route: GET /courses/:id
router.get("/:id", validateCourseId, (req, res) => {
  const id = parseInt(req.params.id);

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  res.json(course);
});

module.exports = router;
