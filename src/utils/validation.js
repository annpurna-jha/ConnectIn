const validator = require('validator');

const validateSignupData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName) throw new Error("Enter First Name!");
    else if(!lastName) throw new Error("Enter Last Name!");
    else if(!validator.isEmail(emailId)) // using npm validator library
    throw new Error("Invalid Email Id!");

    else if(!validator.isStrongPassword(password)) throw new Error("Enter a Strong Passowrd!");
}

const validateEditProfileData = (req)=>{
    const allowedEditFields = ["firstName","lastName","skills","about","photoUrl","gender","age"];
    const isEditAllowed = Object.keys(req.body).every(field=>allowedEditFields.includes(field));
    return isEditAllowed;
}

module.exports = {
    validateSignupData,
    validateEditProfileData
}