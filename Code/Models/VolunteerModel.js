const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = require("./UserModel");
const PatientModel = require("./PatientModel");
const DoctorModel = require("./DoctorModel");
const VolunteerModel = new Schema({
    UserDetails: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
    Experience: Number,
    Patients: [{
        type: Schema.Types.ObjectId,
        ref: "PatientModel",
        // required: true
    }, ],
    DoctorAssigned: {
        type: Schema.Types.ObjectId,
        ref: "DoctorModel",
    },
});

module.exports = mongoose.model("VolunteerModel", VolunteerModel);