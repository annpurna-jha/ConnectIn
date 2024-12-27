const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //reference to the user collection
            required: true
        },
        toUserId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        status:{
            type: String,
            enum: {
                values : ["interested","accepted","rejected","ignored"],
                message:`{VALUE} is not a valid status`
            },
            required: true
        }
    },
    {timestamps : true}
);

connectionRequestSchema.pre("save", function(next){ // run before saving into db
    const connectionRequest = this;
    // check fromUserId and toUserId is same or not
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) throw new Error("Cannot send request to yourself!");
    next();
})

// compound index
connectionRequestSchema.index({fromUserId:1, toUserId:1});// will make quesry fast

const ConnectionRequestModel = mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;

