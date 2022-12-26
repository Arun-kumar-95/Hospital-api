const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },

  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },

  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Report", reportSchema);
