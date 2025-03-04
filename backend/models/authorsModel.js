const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    time: {
        type: String,
        default: function () {
            return new Date().toLocaleTimeString(); // Stores the time in HH:MM:SS format
        }
    }
});
const author = mongoose.model('author', authorSchema);
module.exports = author;