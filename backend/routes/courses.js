const express = require("express");
const db = require("../db");
const auth = require("../middleware/authMiddleware");
const { body, validate } = require("../middleware/validators");
const router = express.Router();

// CREATE
router.post(
  "/",
  auth,
  validate([
    body("course_name").notEmpty().withMessage("Course name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("instructor").notEmpty().withMessage("Instructor is required"),
  ]),
  (req, res) => {
    const { course_name, description, instructor } = req.body;

    db.run(
      "INSERT INTO courses (course_name, description, instructor) VALUES (?, ?, ?)",
      [course_name, description, instructor],
      function (err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: "Course created successfully" });
      }
    );
  }
);


// READ ALL
router.get("/", auth, (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

// READ BY ID
router.get("/:id", auth, (req, res) => {
  db.get(
    "SELECT * FROM courses WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!row) return res.status(404).json({ message: "Course not found" });
      res.json(row);
    }
  );
});

// UPDATE
router.put(
  "/:id",
  auth,
  validate([
    body("course_name").notEmpty(),
    body("description").notEmpty(),
    body("instructor").notEmpty(),
  ]),
  (req, res) => {
    const { course_name, description, instructor } = req.body;

    db.run(
      "UPDATE courses SET course_name=?, description=?, instructor=? WHERE id=?",
      [course_name, description, instructor, req.params.id],
      function (err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0)
          return res.status(404).json({ message: "Course not found" });

        res.json({ message: "Course updated successfully" });
      }
    );
  }
);


// DELETE
router.delete("/:id", auth, (req, res) => {
  db.run(
    "DELETE FROM courses WHERE id=?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ message: err.message });
      if (this.changes === 0) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ message: "Course deleted successfully" });
    }
  );
});

module.exports = router;
