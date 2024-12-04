const express = require("express");
const connectDB=require('./config/database');
const User = require('./models/user');

const app = express();

app.post("/signup",async (req,res)=>{
//creating a new instance of User model
    const user = new User({
        firstName:"Annpurna",
        lastName:"Jha",
        emailId:"annpuna@jha.com",
        password:"annpurna@123"
    })
try {
    await user.save(); //return a promise that's why using async await
    res.send("User added successfully!!");
} catch (error) {
    res.status(400).send("User can't be added");
}
})


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


