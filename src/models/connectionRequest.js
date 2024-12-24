const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
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

const ConnectionRequestModel = mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;

