const express = require('express');
const userRouter = express.Router();

const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');

userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId : loggedInUser._id,
            status:"interested"
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills"); 
        // or we can do .populate("fromUserId", ["firstName", "lastName"])

        res.json({message:"Data fetched successfully!",data:connectionRequests});

    } catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
   
});
module.exports = userRouter;