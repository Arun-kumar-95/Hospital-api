const doctorSchema = require("../../models/doctor.js");
const { errorFormatter } = require("../../utils/errorFormatter.js");

// LOGIN
module.exports.register = async (req, res) => {
  try {
    const { fullName, username, password, email } = req.body;
    let doctor = await doctorSchema.findOne({ username });

    // check if doctor already exists
    if (doctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists",
      });
    }

    doctor = await doctorSchema.create({
      fullName,
      username,
      password,
      email,
    });

    await doctor.save();
    res
      .status(201)
      .json({ success: true, message: "Doctor registered", data: [doctor] });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

// REGISTER
module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // find doctor by username
    let doctor = await doctorSchema.findOne({ username }).select("+password");
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor doesnot exists",
      });
    }

    // if we found the doctor then check for password
    const isMatch = await doctor.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    // generate the token
    const token = await doctor.generateToken();
    // making use of cookies

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .status(200)
      .cookie("token", token, options)
      .json({
        success: true,
        message: "Login successfully",
        data: [doctor],
        token,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

module.exports.logout = async function (req, res) {
  try {
    let options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };

    res.status(200).cookie("token", null, options).json({
      success: true,
      message: "logged out",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};
