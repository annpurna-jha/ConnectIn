const express = require("express");

const app = express();
const {adminAuth, userAuth} = require('./middlewares/auth')
// use of middleware - with help of this we don't have to write login of authentication again and again
app.use("/admin",adminAuth); // auth for all routes /admin

app.get("/user/getAllData",userAuth,(req,res)=>{ //when we don't want auth in all /user route
    res.send("All data sent");
 })
app.get("/user/signup",(req,res)=>{  // if we do auth check like /admin then auth check will happen in signup as well which is not needed
    res.send("User signup successfully");
 })

app.get("/admin/getAllData",(req,res)=>{
   res.send("All data sent");
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a user");
})

app.listen(7777,()=>{ 
    console.log("server is listening");
});

