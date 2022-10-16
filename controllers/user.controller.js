const User = require("../models/user.model.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");

function validate(req) {
  const schema = {
    email: Joi.string().min(1).max(200).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return Joi.validate(req, schema);
}

// Create and Save a new User
exports.register = async (req, res) => {
  // Validate request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // TODO: Check if email already registered
  User.findByEmail(req.body.email, (err, data) => {
    if (data)
      res.status(400).send({
        message: err || "This User already exists.",
      });
  });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(req.body.password, salt);

  // Create a User
  const user = new User({
    email: req.body.email,
    password: passHash,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the User.",
      });
    else res.status(201).send("User created successfully");
  });
};

// Retrieve all Users from the database (with condition).
exports.login = (req, res) => {
  // Validate request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findByEmail(req.body.email, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "User does not exist.",
      });
    else res.status(200).send("User Logged in successfully");
  });
};
