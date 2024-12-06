const express = require("express");
const connectDB=require('./config/database');
const User = require('./models/user');

const app = express();

app.use(express.json()); // will work for all api bcz route is not given, convert json to js object

app.post("/signup",async (req,res)=>{

//    console.log(req.body);//it will show undefined bcz it can't convert json to js object given to postman

//creating a new User with the data getting from request
    const user = new User(req.body);// taking dynamic data from end user here end user here end user is postman

try {
    await user.save(); //return a promise that's why using async await
    res.send("User added successfully!!");
} catch (error) {
    res.status(400).send("User can't be added");
}

});


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


