const express = require("express");
const connectDB=require('./config/database');
const User = require('./models/user');
const {validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json()); // will work for all api bcz route is not given, convert json to js object

app.post("/signup",async (req,res)=>{

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
} catch (error) {
    res.status(400).send("ERROR : " + error.message);
}

});

app.post("/login",async (req,res)=>{
    try{

    // get email id & password from end user
    const{emailId, password} = req.body;

    // get email id from db
    const user = await User.findOne({emailId:emailId});
    // email not present
    if(!user) throw new Error("Invalid credentials");
    // compare password
    const isPasswordValid =await bcrypt.compare(password, user.password);
    if(isPasswordValid) res.send("Login Successfull!");
    else throw new Error("Invalid credentials");

} catch (error) {
    res.status(400).send("ERROR : " + error.message);
}   
    


})

app.get("/user", async (req,res)=>{

    const usereEmail = req.body.emailId;

    // find one user from multiple same email ids
    // const user = await User.findOne({emailId:usereEmail}); //return only one user
    // if(!user) res.status(404).send("User not found");
    // else res.send(user);

    // find all users from given email id
    try{
        const users = await User.find({emailId:usereEmail}); //return all users like return an array
        if(users.length===0) res.status(404).send("User not found");
        else res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong")
    }
});

app.get("/feed", async (req,res)=>{

    // get all users 
    try{
        const users = await User.find({}); //return all users from db, when we paas empty object
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong")
    }
});

// delete user from db
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId); // findByIdAndDelete(userId) is shorthand for findByIdAndDelete({_id : userId}) 
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong")
    }
});

// update user 
app.patch("/user/:userId", async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES =["firstName","lastName","password","age","gender","about","photoUrl","skills"]; // only these thing can be updated
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        const user = await User.findByIdAndUpdate(userId,data,{
            runValidators:true // bcz by default validators not run on updating the document
        }); //findByIdAndUpdate(userId) is shorthand for ffindByIdAndUpdate({_id : userId},data) 
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("Update failed: "+ err.message);
    }
});



//connnect, db first, then listing to server.right way to do it
connectDB().
then(()=>{
    console.log("Database connected succesfully..");
    app.listen(7777,()=>{ 
        console.log("server is listening");
    });
})
.catch((err)=>{
    console.log("Database can't be connected..");
})


