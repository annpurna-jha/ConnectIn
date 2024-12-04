const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String
    },
    lastName : String, // String is shorthand for {type: String}
    emailId : String,
    password: String,
    age : Number,
    gender: String
});
const User = mongoose.model("User",userSchema);
module.exports = User;