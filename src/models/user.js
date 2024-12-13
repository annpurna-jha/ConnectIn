const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
    firstName : {
        type: String,
        required: [true, "First name is required!"], //msg along with checks
        minLength: [2, "First name must be at least 2 characters long!"],
        maxLength: [50, "First name must be at most 50 characters long!"],
        trim:true,
    },
    lastName :{
       type:String,  
       minLength: [2, "Last name must be at least 2 characters long!"],
       maxLength: [50, "Last name must be at most 50 characters long!"],
       trim:true,  
    } ,
    emailId :{
       type:String,
       required: [true, "Email is required!"],
       trim:true,
       unique:true,
       lowercase:true,
    },
    password :{
        type:String,
        required: [true, "Password is required"],
        trim:true,
    },
    age :{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(values){ // validator function will work only when inserting new document, not for updating the document, for that in patch/user api we have to turn it on by default it is off
            if(!["male","female","others"].includes(values)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    about:{
        type: String,
        default:"This is default about of user",
        maxLength:150,
        trim:true,
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-TruksPXPI5imDL_kfzEfFiAZwg5AzHtWg&s",
        validate(value){
            if(!validator.isURL(value)) // using npm validator library
                throw new Error("Invalid photo url: " + value);
       },
    },
    skills:{
        type:[String],
        // validate: {
        //     validator: function (skills) {
        //         // Check array length and ensure each skill is a trimmed non-empty string
        //         return Array.isArray(skills) &&
        //             skills.length > 0 &&
        //             skills.length <= 10 &&
        //             skills.every(skill => skill.trim().length > 0);
        //     },
        //     message: "Skills must contain at least 1 and at most 10 non-empty items"
        // }
    }
    },
    {
        timestamps:true
    }
);
const User = mongoose.model("User",userSchema);
module.exports = User;