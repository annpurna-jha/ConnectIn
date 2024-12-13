const validator = require('validator');

const validateSignupData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName) throw new Error("Enter First Name!");
    else if(!lastName) throw new Error("Enter Last Name!");
    else if(!validator.isEmail(emailId)) // using npm validator library
    throw new Error("Invalid Email Id!");

    else if(!validator.isStrongPassword(password)) throw new Error("Enter a Strong Passowrd!");
}

module.exports = {
    validateSignupData
}