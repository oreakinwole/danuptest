const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");

// Create New User Route
router.post("/register", user.register);
router.get("/", (_, res) => res.send("Welcome!"));

// Create New User Route
router.post("/login", user.login);
module.exports = router;
