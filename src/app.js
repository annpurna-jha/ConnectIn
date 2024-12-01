const express = require("express");

const app = express();

app.get("/admin/getAllData",(req,res)=>{
    //logic of checking is the request is authorized
    const token ="xyzabc";
    const isAdminAuthorized = token =="xyz";
    if(isAdminAuthorized) res.send("All data sent");
    else res.status(401).send("Unauthorized request");
})
app.get("/admin/deleteUser",(req,res)=>{
    //logic of checking is the request is authorized
    const token ="xyz";
    const isAdminAuthorized = token =="xyz";
    if(isAdminAuthorized) res.send("Deleted a user");
    else res.status(401).send("Unauthorized request");
})

app.listen(7777,()=>{ 
    console.log("server is listening");
});

