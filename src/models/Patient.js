const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: ["Enter fullname", true],
    match: [/^[a-zA-Z]+ [a-zA-Z]+$/, "Enter valid name"],
  },

  age: {
    type: Number,
    required: [true, "Enter age"],
    trim: true,
  },

  phone: {
    type: String,
    required: [true, "Enter mobile number"],
    trim: true,
    match: [/^(0|91)?[6-9][0-9]{9}$/, "Enter valid mobile number"],
  },

  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHER"],
  },

  // first visit and which doctor registered first
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },

  // many times report will be created thats why it is array of reports
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});

module.exports = mongoose.model("Patient", patientSchema);
