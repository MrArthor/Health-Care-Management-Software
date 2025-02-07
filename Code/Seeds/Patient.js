const mongoose = require("mongoose");
const PatientModel = require("../Models/PatientModel");
const Data = require("./MOCK_DATA.js");
const Sex = require("./Sex");
const UserModel = require("../Models/UserModel");
const DoctorModel = require("../Models/DoctorModel");
mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/MajorProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async() => {
    const Doctor = await DoctorModel.find({});
    await PatientModel.deleteMany({});
    const Doctors = await DoctorModel.find({});
    for (let i = 0; i < 10; i++) {
        const Patient = new PatientModel({
            //YOUR USER ID

            Doctor: Doctors[i]._id,
            Age: Data[i].noofpatient % 20,
            Sex: Sex[i].Sex,
            BloodPressure: Data[i].noofpatient % 89,
            Temperature: Data[i].noofpatient %99,
            PulseRate: Data[i].noofpatient % 180,
            BloodSugar: Data[i].noofpatient % 199,
            BloodGroup: Data[i].noofpatient % 190,
            Weight: Data[i].noofpatient % 280,
            Height: Data[i].noofpatient % 30,
            Type: "Patient Emergency",
            PreHistory: "Patient has been suffering from fever for the past 3 days",
            CurrentTreatment: "Patient is currently taking paracetamol",
            Medication: "Patient is currently taking paracetamol",
            ReportCount: 0,

        });
        await Patient.save();
        Doctors[i].PatientId.push(Patient._id);
        Doctors[i].NoOfPatients = Doctors[i].NoOfPatients + 1;
        await Doctors[i].save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});