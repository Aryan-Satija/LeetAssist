const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String, 
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 800
    },
    lc_username: {
        type: String
    },
    cf_username: {
        type: String
    }
})

module.exports = mongoose.model("User", userSchema);