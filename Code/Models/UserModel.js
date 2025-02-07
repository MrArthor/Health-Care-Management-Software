const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const encrypt = require("mongoose-encryption");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    FullName: String,
    ContactNumber: Number,
    Address: String,
    Type: String,
    Password: String,
});
var encKey = "YZO/FMmNdjnVeSl7Ixjcwzff5Ajt2hinRUfWns3r52I=";
var sigKey =
    "x+paVEpKTXmZ6B3vCXVcRQtnXU0mWlakLMsokVUDbLcByNN0nPgKgDar68IfcMjuSdnSFhx2IMmkBfacCgMxDQ==";

UserSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });
// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("UserModel", UserSchema);