const patientSchema = require("../../models/Patient.js");
const reportSchema = require("../../models/Report.js");
const { errorFormatter } = require("../../utils/errorFormatter.js");

// ===========  register the patients

module.exports.register = async function (req, res, next) {
  try {
    const { fullName, phone, gender, age } = req.body;

    if (fullName == "" || phone == "" || gender == "" || age == "") {
      return res
        .status(500)
        .json({ success: false, message: "Invalid fields" });
    }
    // find patient using phone number
    let patient = await patientSchema.findOne({ phone });

    // if patient exists  return patient info
    if (patient) {
      return res.status(201).json({
        success: true,
        message: "Patient already exists",
        data: [patient],
      });
    }

    // else create a new patient
    patient = await patientSchema.create({
      fullName,
      phone,
      gender,
      age,
      createdBy: req.doctor._id,
    });

    // save the patient
    await patient.save();

    // return the response

    return res.status(200).json({
      success: true,
      message: "Patient created",
      data: { patient },
    });
  } catch (err) {
    // if error caught return the error
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

// ===========  create report

module.exports.createReport = async function (req, res) {
  try {
    const { status } = req.body;
    let patient = await patientSchema.findById({ _id: req.params.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "No such patient found",
      });
    }

    // create the report
    const report = await reportSchema.create({
      patient: patient._id,
      doctor: req.doctor._id,
      status,
    });

    await report.save();

    // update the patient
    patient.reports.push(report);
    await patient.save();

    // find the doctor field of newly created report
    let foundReport = await reportSchema.findById(report._id.toString());
    await foundReport.save();

    // return the response
    return res.status(200).json({
      success: true,
      message: "Report created",
      status: foundReport.status,
      data: {
        createdBy: req.doctor.fullName,
        createdDate: foundReport.createdAt.toDateString(),
        patientDetails: {
          name: patient.fullName,
          age: patient.age,
          gender: patient.gender,
          phone: patient.phone,
        },
      },
    });
  } catch (err) {
    // if error caught return the error
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

// FIND ALL REPORTS OF A PATIENT

module.exports.getReports = async function (req, res) {
  try {
    const { id } = req.params;

    // find the patient by id
    let patient = await patientSchema.findById({ _id: id });
    // if not patient found
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "No such patient found",
      });
    }

    const reports = await patientSchema.findById({ _id: id }).populate({
      path: "reports",
      options: { sort: { createdAt: 1 } },
      populate: {
        path: "doctor",
      },
    });

    // get all the checked reports
    return res.status(200).json({
      success: true,
      TotalReports: reports.length,
      data: { patient: { reports } },
    });
  } catch (err) {
    // if error caught return the error
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

// =========== GET ALL REPORTS OF ALL THE PATIENTS

module.exports.reportsByStatus = async (req, res) => {
  try {
    // finD all reports OF ALL THE PATIENTS based on status
    const { status } = req.params;

    // reports will return an array
    const reports = await reportSchema
      .find({ status })
      .populate("patient")
      .populate("doctor");

    return res.status(200).json({
      success: true,
      TotalReports: reports.length,
      data: reports,
    });
  } catch (err) {
    // if error caught return the error
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};
