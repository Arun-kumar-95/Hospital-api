const express = require("express");
const router = express.Router();

// authentication
const { isAuthenticated } = require("../../middlewares/auth.js");
// importing function
const {
  register,
  getReports,
  createReport,
  reportsByStatus,
} = require("../../controllers/v1/patient.js");

// defining the patient routes
router.route("/register").post(isAuthenticated, register);
router.route("/:id/create_report").post(isAuthenticated, createReport);
router.route("/:id/all_reports").get(isAuthenticated, getReports);
router.route("/:status").get(isAuthenticated, reportsByStatus);

// exporting the router
module.exports = router;
