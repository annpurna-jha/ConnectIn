// starting point of application

const express = require("express");

const app = express(); //creating instance of express js application or new web server

//handle incoming request
app.use("/test",(req,res)=>{ // request handler
    res.send("Hello from server")
})
app.use("/hello",(req,res)=>{ // request handler
    res.send("Hello hello!")
})

app.listen(7777,()=>{ // server listen on 7777 port no
    console.log("server is listening");
});