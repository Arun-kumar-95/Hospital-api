const doctorSchema = require("../models/doctor.js");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    // getting the token
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login first",
      });
    }

    // if we had token THEN VERIFY TOKEN
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    // fing the doctor via id and store
    req.doctor = await doctorSchema.findById(decode._id);

    // calling the next
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
