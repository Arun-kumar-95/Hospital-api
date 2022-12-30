const express = require("express");
const app = require("./server/main.js");
const { notFound } = require("../src/utils/notFound.js");
const cookieParser = require("cookie-parser");
// require the routes
const doctorRoutes = require("./routes/v1/doctor.js");
const patientRoutes = require("./routes/v1/patient.js");

// adding middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// cookie parser
app.use(cookieParser());

// using the routes
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);


// not found middleware
app.use(notFound);
