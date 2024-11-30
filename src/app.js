const express = require("express");

const app = express();

// //rh is route handler function we write below
// app.use("/route",rh1,rh2,rh3,rh4,rh5);
// // we can write any route handler inside array ,it will not affect anything
// app.use("/route",[rh1,rh2],rh3,rh4,rh5);
// // or app.use("/route",rh1,rh2,rh3,[rh4],rh5); as u want u can add rh in array

// one route can have multiple route handlers

// app.use(
//     "/user",//route
//     (req,res)=>{//route handler
//         console.log("Handling the route user1!!");
//         res.send("1st Response!!"); //it will return 1st response. as soon as api hits it starts executing from top and gpes to first route handler.it gets it's response back. And it will not go to 2nd function.
//     },
//     (req,res)=>{
//         console.log("Handling the route user2!!");
//         res.send("2nd Response!!");
//     }
// )


// app.use(
//     "/user",
//     (req,res,next)=>{
//         console.log("Handling the route user1!!");
//         next(); //here no response is send fron this route handler. and express will not go automatic to next route handler. that's why we use 3rd parameter 'next' and call it from here so it will go to next route handler. if we will not use 'next' then it will not send any response automatic.
//     },
//     (req,res)=>{
//         console.log("Handling the route user2!!");
//         res.send("2nd Response!!");
//     }
// )


//what if
// app.use(
//     "/user",
//     (req,res,next)=>{
//         console.log("Handling the route user1!!");
//         res.send("1st Response!!");
//         next(); // //code executes in call stack & js waits for none.as soon it starts executing this route handler. it start print on console, send the response back to postman, goes to next route handler, print on console,and again try to send response then it will give error into console. as already response is sent from 1st route handler
//     },
//     (req,res)=>{
//         console.log("Handling the route user2!!");
//         res.send("2nd Response!!");
//     }
// )


//what if
// app.use(
//     "/user",
//     (req,res,next)=>{
//         console.log("Handling the route user1!!");
//         next(); //as soon as it starts executing this route handler. it start print on console, call next() & goes to next route handler, it goes to 2nd function and function starts executing in call stack ,print on console, sent reponse back to postman which is "2nd Response", and again comes to 1st route handler & try to execute next line which is  sending response. then it will give error into console. as already response is sent from 2nd route handler and request is fullfill
//         res.send("1st Response!!");
//     },
//     (req,res)=>{
//         console.log("Handling the route user2!!");
//         res.send("2nd Response!!");
//     }
// )


//what if
app.use(
    "/user",
    (req,res,next)=>{
        console.log("Handling the route user1!!");
        next(); 
    },
    (req,res,next)=>{
        console.log("Handling the route user2!!");
        next();
    },
    (req,res,next)=>{
        console.log("Handling the route user3!!");
        next();
    },
    (req,res,next)=>{
        console.log("Handling the route user4!!");
        next();//we are calling next() over here and now express is expecting another route handler and we didn't define any route handler after this. so it will give error "Cannot GET /user".
        // if we will not call next() over here then it will not throw an error but it will hang bc we are not handling the route here
    }
)


app.listen(7777,()=>{ 
    console.log("server is listening");
});

