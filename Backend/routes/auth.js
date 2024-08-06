const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { registerUser, login, getUserData } = require('../controllers/authentication')

const router = express.Router();

//user authentication routes
router.post("/register",registerUser);
router.post("/login",login);
router.get("/getUserData/:id", getUserData);


module.exports = router;
