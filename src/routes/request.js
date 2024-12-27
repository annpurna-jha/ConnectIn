const express = require('express');
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)) return res.status(400).json({message: "Invalid Status "+ status});
        
        const toUser =await User.findById(toUserId);
        if(!toUser) return res.status(404).json({mesaage: "User not found"});

        const existingConnection = await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId: fromUserId,toUserId: toUserId},
                {fromUserId: toUserId,toUserId: fromUserId}
            ]        
        });
        if(existingConnection) return res.status(400).send({message:"Connection Request Already Exists!!"});

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName + " has shown " + (status === "interested" ? "interest" : "no interest") + " in " + toUser.firstName + "'s profile",
            data
        });        
        
    } catch (error) {
        res.status(400).send("ERROR : "+ error.message);
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const {status,requestId} = req.params;

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)) return res.status(400).json({message:"Status not allowed!"});

        const connectionRequest =await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId:  loggedInUser._id,
            status:"interested"
        });
        if(!connectionRequest) return res.status(404).json({message:"Connection request not found!"});

        connectionRequest.status = status;//update status from interested to accpeted/rejected

        const data = await connectionRequest.save();
        res.json({message:"Connection request "+status, data});

    } catch (error) {
        res.status(400).send("ERROR : "+error.mesaage);
    }
});

module.exports = requestRouter;