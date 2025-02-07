const mongoose = require("mongoose");
const PatientModel = require("../models/PatientModel");
const UserModel = require("../models/UserModel");
const DoctorModel = require("../models/DoctorModel");
const encrypt = require("mongoose-encryption");

const VolunteerModel = require("../models/VolunteerModel");
const User = require("./usermodel.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
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
const Type = ["Patient", "Doctor", "Volunteer"];
const seedDB = async() => {
    const Patient = await PatientModel.find({});
    const Doctor = await DoctorModel.find({});
    const Volunteer = await VolunteerModel.find({});
    var Pa = 0,
        Do = 0,
        Vo = 0;

    await UserModel.deleteMany({});
    console.log("Deleted all Users");
    for (let i = 0; i < 30; i++) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(User[i].Password, salt);
        const Users = new UserModel({
            //YOUR USER ID
            username: User[i].username,
            FullName: User[i].Namme,
            ContactNumber: User[i].ContactNumber,
            Address: User[i].Address,
            Type: Type[i % 3],
            Name: User[i].Namme,

            Password: hash,
        });
        await Users.save();

        if (i % 3 == 0) {
            Patient[Pa].UserDetails = Users._id;
            await Patient[Pa].save();
            Pa++;
        }
        if (i % 3 == 1) {
            Doctor[Do].UserDetails = Users._id;
            await Doctor[Do].save();
            Do++;
        }
    }
};

seedDB().then(async() => {
    mongoose.connection.close();
});