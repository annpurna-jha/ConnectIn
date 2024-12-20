const express = require("express");
const connectDB=require('./config/database');
const User = require('./models/user');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json()); // will work for all api bcz route is not given, convert json to js object
app.use(cookieParser());//able to read cookies back

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

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


