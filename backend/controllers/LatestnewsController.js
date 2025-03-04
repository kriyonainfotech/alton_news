const News = require("../models/latestNewsModel");
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
const deleteNews = async (req, res) => {
    try {
      const { newsId } = req.body;
      console.log(req.body);
  
      const news = await News.findById(newsId);
      if (!news) {
        return res
          .status(404)
          .json({ success: false, message: "news not found" });
      }
      if (news.imageUrl) {
        const publicId = getPublicIdFromUrl(news.imageUrl);
        if (publicId) {
          const result = await cloudinary.uploader.destroy(publicId);
          console.log("Cloudinary deletion result:", result);
        } else {
          console.log(
            "Could not extract publicId from image URL:",
            news.imageUrl
          );
        }
      }
      await News.findByIdAndDelete(newsId);
  
      res
        .status(200)
        .json({ success: true, message: "banner deleted successfully" });
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };
  
  const getNewsById = async(req,res) =>{
    try {
        const news = await News.findById(req.params.newsId);
        if (!news) {
            return res.status(404).json({ success: false, message: "News not found" });
        }
        res.status(200).json({ success: true, news });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }
  const updateNews = async (req, res) => {
    try {
      const { newsId, title,description,newsCategory } = req.body;
      console.log(req.body,"update");
      // Find the existing banner
      const news = await News.findById(newsId);
      if (!news) {
        return res.status(404).json({ success: false, message: "news not found" });
      }
  
      // Handle image update if a new file is uploaded
      let imageUrl = news.imageUrl;
      if (req.file) {
        if (imageUrl) {
          const publicId = getPublicIdFromUrl(imageUrl);
          if (publicId) {
            try {
              await cloudinary.uploader.destroy(publicId);
            } catch (err) {
              console.error("Error deleting old image from Cloudinary:", err);
            }
          }
        }
        imageUrl = req.file.path;
      }
  
      // Update the news fields
      news.title = title || news.title;
      news.description = description || news.description;
      news.newsCategory = newsCategory || news.newsCategory;
      news.imageUrl = imageUrl;
      await news.save();
  
      res.status(200).json({ success: true, message: "news updated successfully", news });
    } catch (error) {
      console.error("Error updating banner:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
module.exports = {
    addNews,
    getAllNews,
    deleteNews,
    getNewsById,
    updateNews

}