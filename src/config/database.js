const mongoose = require('mongoose');

const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://annpurnajha4:Annpurna2002@namastenode.t4jex.mongodb.net/connectIn');//connecting to db. for connecting to cluster remove /connectIn
}
module.exports = connectDB;
