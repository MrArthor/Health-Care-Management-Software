const express = require("express");
const router = express.Router();
const PatientModel = require("../Models/PatientModel");
const FeedbackModel = require("../Models/FeedbackModel");
const request = require("request-promise");
const calendar = require("node-calendar"); // Importing Calendar
const { IsLoggedIn } = require("../middleware");

router.get("/patient-portal", (req, res) => {
  // Patient Portal
  const Title = "Patient Portal";
  const CssLink = "patient-portal";
  res.render("Patient/Patient-Portal", { Title, CssLink }); // Rendering Patient Portal
});

router.get("/add-patient", (req, res) => {
  // Add Patient
  const Title = "Add Patient";
  const CssLink = "add-patient";
  res.render("Patient/Add-Patient", { Title, CssLink }); // Rendering Add Patient
});

router.post("/add-patient", async (req, res) => {
  // Add Patient Post Request
  const Title = "Add Patient";
  const CssLink = "add-patient";
  const Patient = new PatientModel({
    PreHistory: req.body.Patient.prehistory,
    Age: req.body.Patient.age,
    Treatment: req.body.Treatment,
    BloodGroup: req.body.Patient.bloodgrp,
    BloodSugar: req.body.Patient.BloodSugar,
    BloodPressure: req.body.Patient.bloodprs,
    PulseRate: req.body.Patient.pulserate,
    Weight: req.body.Patient.weight,
    Height: req.body.Patient.height,
  });
  await Patient.save(); // Saving Patient
  res.redirect(`/Patient/${Patient._id}/`); // Redirecting to Patient Portal
});

router.get("/:id", IsLoggedIn, async (req, res) => {
  // Patient Portal
  const Title = "Patient Portal";
  let date = new Date();
  const Month = date.getMonth();

  const Year = date.getFullYear();
  const MonthName = calendar.month_name[Month + (1 % 12)];
  const Dat = [];

  for (let i = -3; i < 4; i++) {
    const Dates = calendar.weekday(Year, Month, date.getDate());

    Dat.push(date.getDate() + i);
  }
  Days = calendar.day_name;

  const CssLink = "patient-portal";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  res.render("Patient/Patient-Portal", {
    Title,
    CssLink,
    Patient,
    MonthName,
    Year,
    Dat,
    Days,
  }); //  Rendering Patient Portal
});

router.get("/:id/vitals-edit-form", IsLoggedIn, async (req, res) => {
  // Vitals Edit Form
  const Title = "Edit Vitals";
  const CssLink = "vitals-edit-form";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  res.render("Patient/Vitals-Edit-Form", { Title, CssLink, Patient }); // Rendering Vitals Edit Form
});

router.post("/:id/vitals-edit-form", IsLoggedIn, async (req, res) => {
  // Vitals Edit Form Post Request
  const Title = "Edit Vitals";
  const CssLink = "vitals-edit-form";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  Patient.BloodSugar = req.body.vital.sugar;
  Patient.BloodPressure = req.body.vital.pressure;
  Patient.PulseRate = req.body.vital.pulserate;
  Patient.Temperature = req.body.vital.temp;
  await Patient.save();
  // res.send(Patient);
  res.redirect(`/Patient/${Patient._id}`); // Redirecting to Patient Portal
});

router.get("/:id/patient-portal-emr", IsLoggedIn, async (req, res) => {
  // Patient Portal EMR
  const Title = "Patient Portal EMR";
  const CssLink = "patient-portal-emr";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  res.render("Patient/patient-portal-emr", { Title, CssLink, Patient }); // Rendering Patient Portal EMR
});

router.get("/:id/patient-portal-calendar", async (req, res) => {
  // Patient Portal Calendar
  const date = new Date();
  const Month = date.getMonth();
  const Year = date.getFullYear();
  const MonthName = calendar.month_name[Month + (1 % 12)];
  const Dat = new calendar.Calendar().itermonthdays(Year, Month + 1);

  Days = [];
  for (let i = 0; i < 7; i++) {
    Days.push(calendar.day_name[i % 7]);
  }

  const Title = "Patient Portal Calendar";
  const CssLink = "patient-portal-calendar";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  res.render("Patient/patient-portal-calendar", {
    Title,
    CssLink,
    Patient,
    MonthName,
    Year,
    Days,
    Dat,
  }); // Rendering Patient Portal Calendar
});

router.get("/:id/patient-portal-feedback", IsLoggedIn, async (req, res) => {
  // Patient Portal Feedback
  const Title = "Patient Portal Feedback";
  const CssLink = "patient-portal-feedback";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  res.render("Patient/patient-portal-feedback", { Title, CssLink, Patient }); // Rendering Patient Portal Feedback
});

router.post("/:id/patient-portal-feedback", IsLoggedIn, async (req, res) => {
  // Patient Portal Feedback Post Request
  const Title = "Patient Portal Feedback";
  const CssLink = "patient-portal-feedback";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  const Feedback = new FeedbackModel({
    FullName: req.body.feedback.fullname,
    Email: req.body.feedback.email,
    Message: req.body.feedback.feedback,
  });
  await Feedback.save(); // Saving Feedback
  res.redirect(`/Patient/${Patient._id}`); // Redirecting to Patient Portal
});

router.get(
  "/:id/patient-portal-chat-app-doc-vol",
  IsLoggedIn,
  async (req, res) => {
    // Patient Portal Chat App
    const Title = "Patient Portal Chat App";
    const CssLink = "patient-portal-chat-app-doc-vol";
    const PatientId = req.params.id;
    const Patient = await PatientModel.findById(PatientId)
      .populate("UserDetails")
      .populate("Doctor")
      .populate("Volunteer")
      .populate("Emr");
    res.render("Patient/patient-portal-chat-app-doc-vol", {
      Title,
      CssLink,
      Patient,
    }); // Rendering Patient Portal Chat App
  }
);

router.get(
  "/:id/patient-portal-chat-app-volunteer",
  IsLoggedIn,
  async (req, res) => {
    // Patient Portal Chat App
    const Title = "Patient Portal Chat App";
    const CssLink = "patient-portal-chat-app-volunteer";
    const PatientId = req.params.id;
    const Patient = await PatientModel.findById(PatientId); //

    res.render("Patient/patient-portal-chat-app-volunteer", {
      Title,
      CssLink,
      Patient,
    }); // Rendering Patient Portal Chat App
  }
);

router.get(
  "/:id/patient-portal-chat-app-doctor",
  IsLoggedIn,
  async (req, res) => {
    // Patient Portal Chat App
    const Title = "Patient Portal Chat App";
    const CssLink = "patient-portal-chat-app-doctor";
    const PatientId = req.params.id;
    const Patient = await PatientModel.findById(PatientId)
      .populate("UserDetails")
      .populate("Doctor")
      .populate("Volunteer")
      .populate("Emr");
    res.render("Patient/patient-portal-chat-app-doctor", {
      Title,
      CssLink,
      Patient,
    }); // Rendering Patient Portal Chat App
  }
);

router.get("/:id/patient-portal-billing", IsLoggedIn, async (req, res) => {
  // Patient Portal Billing
  const Title = "Patient Portal Billing";
  const CssLink = "patient-portal-billing";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  res.render("Patient/patient-portal-billing", { Title, CssLink, Patient }); // Rendering Patient Portal Billing
});

router.get("/:id/patient-portal-settings", IsLoggedIn, async (req, res) => {
  // Patient Portal Settings
  const Title = "Patient Portal Settings";
  const CssLink = "patient-portal-settings";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  if (Patient) {
    res.render("Patient/patient-portal-settings", { Title, CssLink, Patient }); // Rendering Patient Portal Settings
  }
});
router.get("/:id/mental-health-form", IsLoggedIn, async (req, res) => {
  // Mental Health Form
  const Title = "Mental Health Test";
  const CssLink = "mental-health-form";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  res.render("General/mental-health-form", { Title, CssLink, Patient }); // Rendering Mental Health Form
});

router.post("/:id/mental-health-form", IsLoggedIn, async (req, res) => {
  // Mental Health Form Post Request
  const Title = "Mental Health Test"; // Mental Health Form
  const CssLink = "quiz-result"; // Mental Health Form
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId)
    .populate("UserDetails")
    .populate("Doctor")
    .populate("Volunteer")
    .populate("Emr");
  const mentalhealth = req.body.mentalhealth;

  const options = {
    method: "POST",

    uri: "http://127.0.0.1:9501/MachineLearningModel", // Python Server
    body: mentalhealth, // Sending Data to Python Server

    json: true, // Automatically stringifies the body to JSON
  };
  let result; // Result from Python Server
  const sendrequest = await request(options) // Sending Request to Python Server
    .then(function (parsedBody) {
      // Getting Response from Python Server
      result = parsedBody["result"]; // Getting Result from Python Server
    })
    .catch(function (err) {
      // Error Handling
    });
  res.render("General/quiz-result", { Title, CssLink, Patient, result }); // Rendering Quiz Result
  // res.redirect(`/Patient/${Patient._id}`);
});

router.get("/:id/patient-portal-lab-tests", IsLoggedIn, async (req, res) => {
  // Patient Portal Lab Tests
  const Title = "Patient Portal Lab Tests";
  const CssLink = "patient-portal-lab-tests";
  const PatientId = req.params.id;
  const Patient = await PatientModel.findById(PatientId) // Finding Patient
    .populate("UserDetails") // Populating User Details
    .populate("Doctor") // Populating Doctor
    .populate("Volunteer"); // Populating Volunteer
  //     .populate('Emr') // Populating Emr
  //     .populate('LabTests') // Populating Lab Tests
  res.render("Patient/patient-portal-lab-tests", { Title, CssLink, Patient });
  // Rendering Patient Portal Lab Tests
});
router.all("*", (req, res) => {
  // 404 Page Not Found
  const Title = "404"; // 404 Page Not Found
  const CssLink = "Patient-portal-billing"; // 404 Page Not Found
  //  res.send('404 Page Not Found')
  res.render("Patient/Patient-Portal-billing", { Title, CssLink }); //Address Not Found
});
module.exports = router; // Exporting Router
