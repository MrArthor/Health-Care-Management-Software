const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const encrypt = require("mongoose-encryption");

const FeedbackSchema = new Schema({
    FullName: String,
    Email: String,
    Message: String,
});
var encKey = "YZO/FMmNdjnVeSl7Ixjcwzff5Ajt2hinRUfWns3r52I=";
var sigKey =
    "x+paVEpKTXmZ6B3vCXVcRQtnXU0mWlakLMsokVUDbLcByNN0nPgKgDar68IfcMjuSdnSFhx2IMmkBfacCgMxDQ==";

FeedbackSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });
module.exports = mongoose.model("FeedbackModel", FeedbackSchema);