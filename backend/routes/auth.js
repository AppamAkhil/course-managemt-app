const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { body, validate } = require("../middleware/validators");
const router = express.Router();

router.post(
  "/register",
  validate([
    body("name")
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Invalid email format"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ]),
  async (req, res) => {
    const { name, email, password } = req.body;
    const emailLower = email.toLowerCase().trim();

    const hashed = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, emailLower, hashed],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res.status(400).json({ message: "Email already exists" });
          }
          return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  }
);



router.post(
  "/login",
  validate([
    body("email")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ]),
  (req, res) => {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase().trim();

    db.get(
      "SELECT * FROM users WHERE email=?",
      [emailLower],
      async (err, user) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!user)
          return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
          return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.json({ token });
      }
    );
  }
);


module.exports = router;