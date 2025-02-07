const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = require("./UserModel");
const PatientModel = require("./PatientModel");
const encrypt = require("mongoose-encryption");
const VolunteerModel = require("./VolunteerModel");
const DoctorSchema = new Schema({
    UserDetails: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        //     required: true++
    },
    Experience: Number,
    Specialization: String,
    Qualification: String,
    NoOfPatients: Number,
    Department: String,
    BriefDescription: String,
    Domain: String,

    Temperature: Number,
    PulseRate: Number,
    TestsScheduled: Number,
    PatientId: [{
        type: Schema.Types.ObjectId,
        ref: "PatientModel",
        // required: true
    }, ],
    Volunteers: [{
        type: Schema.Types.ObjectId,
        ref: "VolunteerModel",
        // required: true
    }, ],
});
var encKey = "YZO/FMmNdjnVeSl7Ixjcwzff5Ajt2hinRUfWns3r52I=";
var sigKey =
    "x+paVEpKTXmZ6B3vCXVcRQtnXU0mWlakLMsokVUDbLcByNN0nPgKgDar68IfcMjuSdnSFhx2IMmkBfacCgMxDQ==";

DoctorSchema.plugin(encrypt, {
    encryptionKey: encKey,
    signingKey: sigKey,
    excludeFromEncryption: ["UserDetails"],
});

module.exports = mongoose.model("DoctorModel", DoctorSchema);