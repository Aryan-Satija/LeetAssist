const mongoose = require('mongoose');
require('dotenv').config();
exports.connect = ()=>{
    const uri = process.env.DBuri;
    mongoose.connect(uri)
    .then(()=>{
        console.log('DB connected successfully');
    })
    .catch((error)=>{
        console.log('DB connection Failed');
        console.log(error);
        process.exit(1);
    })
}