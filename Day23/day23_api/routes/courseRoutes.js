const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

let courses = [
    { id: 1, name: "Node.js Basics", duration: "4 weeks" }
];

const validateCourse = [
    body("name").notEmpty().withMessage("Course name is required"),
    body("duration").notEmpty().withMessage("Course duration is required")
];

router.get("/", (req, res) => {
    res.json(courses);
});

router.post("/", validateCourse, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ status: 400, message: errors.array()[0].msg });
    }
    const { name, duration } = req.body;
    const newCourse = {
        id: Date.now(),
        name,
        duration
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

router.put("/:id", validateCourse, (req, res, next) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) {
        return next({ status: 404, message: "Course not found" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ status: 400, message: errors.array()[0].msg });
    }
    course.name = req.body.name;
    course.duration = req.body.duration;
    res.json(course);
});

router.delete("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) {
        return next({ status: 404, message: "Course not found" });
    }
    courses.splice(index, 1);
    res.json({ message: "Course deleted successfully" });
});

module.exports = router;
