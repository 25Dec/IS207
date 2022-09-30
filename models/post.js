const mongoose = require('mongoose');

// build the schema: that describes how the data looks

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('post', postSchema);