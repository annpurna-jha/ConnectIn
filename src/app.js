const express = require("express");

const app = express();
app.get("/getUserData",(req,res)=>{   
        throw new error('dfhhf');
 })
//  for this express checks 4 arguments and treat 1st argument as error.if 3 argument is present it will treat 3rd argument as next . so 4 argument is must
// this function should have in last so any error occur in code it cand handle it gracefully.
 app.use("/", (err, req, res, next)=>{ //error handling middleware function
    if(err){
        // log error
        res.status(500).send("Something went wrong!")
    }
 })

app.listen(7777,()=>{ 
    console.log("server is listening");
});

