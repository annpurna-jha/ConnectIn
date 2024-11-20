const express = require("express");
const app = express();

//this will match all the http method api calls to /user. we know order matters a lot so below GET POST API call will never get a chance to execute 
app.use("/user",(req,res)=>{ 
    res.send("Hello from server")
});

//this will only handle GET call to /user
app.get("/user",(req,res)=>{
    console.log(req.query);//get queryParams into route handler
    res.send({firstName:"Akshay", lastName:"Saini"});
});

//makes routes dynamic
app.get("/user/:userId",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Akshay", lastName:"Saini"});
});

//makes routes dynamic
app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Akshay", lastName:"Saini"});
});

//this will only handle POST call to /user
app.post("/user",(req,res)=>{
    console.log("Save Data to the database");
    res.send("Data successfully saved to the database")
});

app.listen(7777,()=>{ // server listen on 7777 port no
    console.log("server is listening");
});

