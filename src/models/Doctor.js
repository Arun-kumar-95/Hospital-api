const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: ["Please enter your full name", true],
    match: [/^[a-zA-Z]+ [a-zA-Z]+$/, "Enter valid name"],
  },
  username: {
    type: String,
    required: ["Create your username", true],
    unique: ["Username already taken", true],
    lowercase: true,
  },
  email: {
    type: String,
    required: ["Please enter your email address", true],
    unique: ["Email already taken", true],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: ["Enter your password", true],
    select: false,
    minLength: [6, "Password must be of 6 character"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// METHODS

doctorSchema.pre("save", async function (next) {
  // create the salt
  let salt = await bcrypt.genSalt(10);
  // modify password field only is password field is changed
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// matchPassword
doctorSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate token

doctorSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

module.exports = mongoose.model("Doctor", doctorSchema);
