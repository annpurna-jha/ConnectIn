const express = require('express');
const authRouter = express.Router();

const bcrypt = require('bcrypt');
const {validateSignupData} = require('../utils/validation');
const User = require('../models/user');

authRouter.post("/signup",async (req,res)=>{ // same as app.post

    try {
        // validate req.body
        validateSignupData(req);

        const{firstName,lastName,emailId, password} = req.body;

        // encrypt the password with bcrypt library
        const hashPassword = await bcrypt.hash(password,10);
        // console.log(hashPassword);

        //creating a new User with the data getting from request
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : hashPassword, // storing encrypted password into password
        });// taking dynamic data from end user here end user here end user is postman


        await user.save(); //return a promise that's why using async await
        res.send("User added successfully!!");
    }catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }

}); 

authRouter.post("/login",async (req,res)=>{

    try{
        // get email id & password from end user
        const{emailId, password} = req.body;

        // get email id from db
        const user = await User.findOne({emailId:emailId});

        // email not present
        if(!user) throw new Error("Invalid credentials");

        // compare password
        const isPasswordValid =await user.validatePassword(password); // schema methods

        if(isPasswordValid){
            // jwt token
            const token = await user.getJWT(); //schema methods, good practice

            // add the token to cookie and send the response back to the user
            res.cookie("token",token, 
                {expires:new Date(Date.now() +  7 * 24 * 60 * 60 * 1000)}// 7 days from now
            );
            res.send("Login Successfull!");

        }else throw new Error("Invalid credentials");
    }catch (error) {
        res.status(400).send("ERROR : " + error.message);
    } 
});

authRouter.post("/logout", (req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("Logout Successfull!!");
});

module.exports = authRouter;