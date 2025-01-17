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
    },
    lastPlayed: {
        type: Date,
        default: new Date('1970-01-01T00:00:00Z') 
    },
    lastSolved: {
        type: Date,
        default: new Date('1970-01-01T00:00:00Z')
    },
    problemsOfTheDay: {
        type: [
            {
                id: { type: String, required: true },
                title: { type: String, required: true },
                slug: {type: String, required: true},
                difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
                solved: { type: Boolean, default: false },
                rating: {type: Number},
            }
        ],
        default: []
    },      
    reasoning: {
        type: Number,
        default: 0
    },
    debugging: {
        type: Number,
        default: 0
    },
    memory: {
        type: Number,
        default: 0
    },
    step: {
        type: Number,
        default: 0
    },
    roadmap: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model("User", userSchema);