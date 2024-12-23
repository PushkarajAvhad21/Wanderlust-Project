const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },//no need to defined field like username and password it automatically create it(passport-local-mongoose) for use
});

userSchema.plugin(passportLocalMongoose);//it automatically implement username,password,hashing and salting by itself

module.exports = mongoose.model("User", userSchema);