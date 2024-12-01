const express = require("express");

const app = express();

// use of middleware - with help of this we don't have to write login of authentication again and again
app.use("/admin",(req,res,next)=>{
    const token ="xyz";
    const isAdminAuthorized = token =="xyz";
    if(!isAdminAuthorized) res.status(401).send("Unauthorized request");
    else next();
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

