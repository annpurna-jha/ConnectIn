const express = require("express");

const app = express();
const connectDB=require('./config/database');

//connnect db first then listing to server.right way to do it
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


