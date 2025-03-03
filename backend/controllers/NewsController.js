const News = require("../models/news");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

const getPublicIdFromUrl = (url) => {
    const regex = /\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/;
    const match = url.match(regex);
    if (match) {
        return `${match[1]}/${match[2]}`; // captures the folder and file name without versioning or extension
    }
    return null;
};

const addNews = async (req, res) => {
    try {
        const imageUrl = req.file.path; // or req.file.path if using multer
        const { title, description, newsCategory } = req.body; // Fix here

        console.log(imageUrl, "image ");

        // Create and save a new Banner instance
        const news = new News({ title, description, newsCategory, imageUrl });
        await news.save();

        return res.status(200).send({
            success: true,
            message: "News added successfully",
            news
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while adding the news",
            error: error.message,
        });
    }
};

const getAllNews = async (req, res) => {
    try {

        const news = await News.find({})
        // console.log(news, "news");
        return res.status(200).send({
            success: true,
            message: "news fetched successfully",
            news,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while fetching news",
            error: error.message,
        });
    }
};
module.exports = {
    addNews,
    getAllNews
}