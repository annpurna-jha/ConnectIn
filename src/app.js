const express = require("express");

const app = express();

//best way to handle error is using try-catch block
app.get("/getUserData",(req,res)=>{   
    try {
        throw new error('dfhhf');//here error occurs so it will go to catch block. if no error occur then it send the response back.
        res.send("All data sent");
    } catch (error) {
        res.status(500).send("Something went wrong. Contact Support team.")
    }
    
 })

app.listen(7777,()=>{ 
    console.log("server is listening");
});

