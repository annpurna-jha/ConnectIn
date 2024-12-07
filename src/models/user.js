const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    firstName : {
        type: String,
        required: true,
        maxLength:50
    },
    lastName :{
       type:String,    
    } ,
    emailId :{
       type:String,
       required:true,
       trim:true,
       unique:true,
       lowercase:true
    },
    password:{
        type:String,
        required:true,
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
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-TruksPXPI5imDL_kfzEfFiAZwg5AzHtWg&s"
    },
    skills:{
        type:[String]
    }
    },
    {
        timestamps:true
    }
);
const User = mongoose.model("User",userSchema);
module.exports = User;