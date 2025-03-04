const mongoose = require('mongoose');
const latestnewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    newsCategory: {
        type: String,
        required: true
    },
    imageUrl: {
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
const latestNews = mongoose.model('latestNews', latestnewsSchema);
module.exports = latestNews;