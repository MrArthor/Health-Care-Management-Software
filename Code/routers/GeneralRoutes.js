const express = require("express"); // Importing Express
const router = express.Router(); // Creating Router
const UserModel = require("../Models/UserModel"); // Importing User Model
const DoctorModel = require("../Models/DoctorModel"); // Importing Doctor Model
const PatientModel = require("../Models/PatientModel"); // Importing Patient Model
const VolunteerModel = require("../Models/VolunteerModel"); // Importing Volunteer Model
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/", (req, res) => {
    // Home Page
    const Title = "Home";
    const CssLink = "home-page";
    res.render("General/home-page", { Title, CssLink });
});

router.get("/home-page", (req, res) => {
    // Home Page
    const Title = "Home";
    const CssLink = "home-page";
    res.render("General/home-page", { Title, CssLink });
});

router.get("/about-us", (req, res) => {
    // About Us Page
    const Title = "About Us";
    const CssLink = "about-us";
    res.render("General/about-us", { Title, CssLink });
});

router.get("/contact-us", (req, res) => {
    // Contact Us Page
    const Title = "Contact Us";
    const CssLink = "contact-us";
    res.render("General/contact-us", { Title, CssLink });
});

router.get("/log-in", (req, res) => {
    // Log In Page
    const Title = "Log In";
    const CssLink = "log-in";
    res.render("General/log-in", { Title, CssLink });
});

router.post("/log-in", async(req, res) => {
    // Log In Page
console.log(req.body)
    const User = await UserModel.findOne({ username: req.body.Signin.username });
    const annswer = bcrypt.compareSync(req.body.Signin.password, User.Password); // true
    if (annswer) {
        req.session.user = User;

        if (User.Type == "Doctor") {
            const Doctor = await DoctorModel.findOne({ UserDetails: User._id });
            res.redirect("/Doctor/" + Doctor._id);
        } else if (User.Type == "Patient") {
            const Patient = await PatientModel.findOne({ UserDetails: User._id });

            res.redirect("/Patient/" + Patient._id);
        } else if (User.Type == "Volunteer") {
            const Volunteer = await VolunteerModel.findOne({ UserDetails: User._id });
            res.redirect("/Volunteer/" + Volunteer._id);
        }
    } else {
        res.redirect("/log-in");
    }
});

router.get("/sign-up", (req, res) => {
    // Sign Up Page
    const Title = "Sign Up";
    var CssLink = "sign-up";
    res.render("General/sign-up", { Title, CssLink });
});

router.post("/sign-up", async(req, res) => {
    // Sign Up Page Post Request
    //const Title = "Sign Up";
    const temp = req.body.Signup;
    const User = new UserModel(req.body.Signup);
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            User.Password = hash; // Store hash in your password DB.
        });
    });
    await User.save();
    if (temp.Type == "Doctor") res.redirect("/Doctor/add-doctor");
    else if (temp.Type == "Patient") res.redirect("/Patient/add-patient");
    else if (temp.Type == "Volunteer") res.redirect("/Volunteer/add-volunteer");
});

router.get("/contact-us", (req, res) => {
    // Contact Us Page
    const Title = "Contact Us";
    const CssLink = "contact-us";
    res.render("General/contact-us", { Title, CssLink });
});

router.get("/Chat", async(req, res) => {
        const Title = "Chat";
    res.redirect("http://localhost:8000/");
});

router.get("/LogOut", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;