const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String
    },
    content: {
        type: [{
            title: String,
            content: String,
            imageUrl: String
        }]
    },
    problems: {
        type: [{
            problemName: String,
            problemLink: String,
            hints: [String]
        }]
    }
});

module.exports = mongoose.model("blogs", BlogSchema);