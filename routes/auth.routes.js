const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Min password length 6 charecters").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      console.log("body: ", req.body);
      const erros = validationResult(req);

      if (!erros.isEmpty()) {
        return res.status(400).json({
          erros: erros.array(),
          message: "Inccorect data during registration"
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "Such user already exist!" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User created!" });
    } catch (e) {
      res.status(500).json({ message: "Something wrong..." });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Input correct email")
      .normalizeEmail()
      .isEmail(),
    check("password", "Input password").exists()
  ],
  async (req, res) => {
    try {
      const erros = validationResult(req);

      if (!erros.isEmpty()) {
        return res.status(400).json({
          erros: erros.array(),
          message: "Inccorect data during login"
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Such user doesn't exist!" });
      }

      const isMath = await bcrypt.compare(password, user.password);

      if (!isMath) {
        return res.status(400).json({ message: "Iccorect password!" });
      }

      const token = jwt.sign(
        {
          userId: user.id
        },
        config.get("jwtSecret"),
        {
          expiresIn: "1h"
        }
      );

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Something wrong..." });
    }
  }
);

module.exports = router;
