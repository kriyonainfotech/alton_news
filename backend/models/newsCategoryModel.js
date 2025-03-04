const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    iconUrl: {
        type: String,
       
        trim: true,
    },
   
});
const newsCategory = mongoose.model('newsCategory', categorySchema);
module.exports = newsCategory;