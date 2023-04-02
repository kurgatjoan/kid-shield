const router = require("express").Router();
const path = require("path");

// const User = require("../models/userModel");
const db = require("../models");
const User = require("../models/userModel")(db.sequelize, db.Sequelize);
const authRoutes = require("./api/authRoutes")(User);
const userRoutes = require("./api/userRoutes")(User);

// api routes
router.use("/auth", authRoutes);
router.use("/api", userRoutes);

// function requireAuth(req, res, next) {
//   if (req.session && req.session.user) {
//     return next;
//   } else {
//     res.redirect('/login')
//   }
// }

// frontend routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

router.get("/blocked", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/blocked.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

router.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/settings.html"));
});

module.exports = router;
