const UserSchema = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate request data
  if (!username || !email || !password) {
    console.log("Validation failed:", { username, email, password });
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await UserSchema.findOne({ email });
  if (existingUser) {
    console.log("User already exists:", email);
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Create new user
    const user = new UserSchema({
      username,
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User addded!", user })
  } catch (error) {
    console.error("Registration error:", error.message); // Log the exact error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate request data
  if (!email || !password) {
    console.log("Validation failed:", { email, password });
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserSchema.findOne({ email });

    //if user is not present
    if (!user) {
      console.log("Invalid credentials:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //match the credentials to the user in the db
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials (password mismatch):", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json(user);
    console.log(res)
    // localStorage.setItem("user-id", res.user._id);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error . Plese try again later",
      error: error.message,
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res
      .status(500)
      .json({
        message: "Server Error. Please try again later.",
        error: error.message,
      });
  }
};
