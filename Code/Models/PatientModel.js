const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = require("./UserModel");
const DoctorModel = require("./DoctorModel");
const VolunteerModel = require("./VolunteerModel");
const encrypt = require("mongoose-encryption");

const PatientSchema = new Schema({
  UserDetails: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
    //required: true
  },
  Doctor: {
    type: Schema.Types.ObjectId,
    ref: "DoctorModel",
    // required: true
  },
  Volunteer: {
    type: Schema.Types.ObjectId,
    ref: "VolunteerModel",
    // required: true
  },
  Status: String,
  Age: Number,
  Treatment: String,
  Sex: String,
  BloodGroup: String,
  BloodSugar: Number,
  PulseRate: Number,
  Medication: String,
  CurrentTreatment: String,
  PreHistory: String,
  ReportCount: Number,
  Temperature: Number,
  BloodPressure: Number,
  Weight: Number,
  Height: Number,
  Emr: {
    type: Schema.Types.ObjectId,
    ref: "EmrModel",
    // required: true
  },
  Type: String,
});
var encKey = "YZO/FMmNdjnVeSl7Ixjcwzff5Ajt2hinRUfWns3r52I=";
var sigKey =
  "x+paVEpKTXmZ6B3vCXVcRQtnXU0mWlakLMsokVUDbLcByNN0nPgKgDar68IfcMjuSdnSFhx2IMmkBfacCgMxDQ==";

PatientSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  excludeFromEncryption: ["UserDetails"],
});
module.exports = mongoose.model("PatientModel", PatientSchema);
