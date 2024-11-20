// starting point of application

const express = require("express");

const app = express(); //creating instance of express js application or new web server

//handle incoming request

// this use() will get all HTTP methods 
app.use("/",(req,res)=>{ // as this route handler start with / anything after this will get the same result . it will override all other route and give same result everytime.  for ex - /test
    res.send("Hello annpurna")
})

app.use("/test",(req,res)=>{ // as this route handler start with /test anything after this will get the same result . for ex - /test/xyz
    res.send("Hello from server")
})

app.listen(7777,()=>{ // server listen on 7777 port no
    console.log("server is listening");
});