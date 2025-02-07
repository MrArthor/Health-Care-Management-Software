const express = require("express");
const router = express.Router();
const { IsLoggedIn } = require("../middleware");
router.get("/", (req, res) => {
    // Volunteer Page
    res.send("Volunteer Page");
});

router.get("/add-volunteer", (req, res) => {
    // Add Volunteer Page
    const Title = "Add Volunteer";
    const CssLink = "add-volunteer";
    res.render("Volunteer/add-volunteer", { Title, CssLink }); // Render Add Volunteer Page
});
router.get("/:id/volunteer-study-portal", IsLoggedIn, (req, res) => {
    // Volunteer Study Portal Page
    const Title = "Volunteer Study Portal";
    const CssLink = "volunteer-study-portal";
    res.render("Volunteer/volunteer-study-portal", { Title, CssLink }); // Render Volunteer Study Portal Page

    // res.send('Volunteer Study Portal');
});

module.exports = router; // Exporting Router