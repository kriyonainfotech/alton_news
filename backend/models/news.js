const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
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
    }
});
const news = mongoose.model('News', newsSchema);
module.exports = news;