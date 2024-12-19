const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req,res,next)=>{

    try{
        const cookies = req.cookies;
        const{token} = cookies;

        if(!token) throw new Error("Invalid Token!!");

        const decodedMessage = await jwt.verify(token,"Connect@In$790");
        const {_id} = decodedMessage;

        const user = await User.findById(_id);    

        if(!user) throw new Error("User does not exist");

        req.user = user;//send user data back
        next();// calling request handler
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
}
module.exports = 
{userAuth};
