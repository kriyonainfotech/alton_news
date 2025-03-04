const NewsCategory = require("../models/newsCategoryModel");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const getPublicIdFromUrl = (url) => {
    const regex = /\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/;
    const match = url.match(regex);
    if (match) {
        return `${match[1]}/${match[2]}`; // captures the folder and file name without versioning or extension
    }
    return null;
};

// Add a new news category
const addCategory = async (req, res) => {
    try {
        const iconUrl = req.file ? req.file.path : null;// or req.file.path if using multer
        const { name, description } = req.body; // Fix here
console.log(req.body,"cat");

        console.log(iconUrl, "image ");

        // Create and save a new Banner instance
        const news = new NewsCategory({ name, description, iconUrl });
        await news.save();

        return res.status(200).send({
            success: true,
            message: "Category added successfully",
            news
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while adding the Category",
            error: error.message,
        });
    }
};

// Get all news categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await NewsCategory.find({});
        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            categories,
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching categories",
            error: error.message,
        });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await NewsCategory.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, category });
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Update news category
const updateCategory = async (req, res) => {
    try {
        const { categoryId, title, description, iconUrl } = req.body;

        const category = await NewsCategory.findById(categoryId);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        category.title = title || category.title;
        category.description = description || category.description;
        category.iconUrl = iconUrl || category.iconUrl;

        await category.save();

        res.status(200).json({ success: true, message: "Category updated successfully", category });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const { newsId } = req.body;
        console.log(req.body);
    
        const news = await NewsCategory.findById(newsId);
        if (!news) {
          return res
            .status(404)
            .json({ success: false, message: "news not found" });
        }
        if (news.iconUrl) {
          const publicId = getPublicIdFromUrl(news.iconUrl);
          if (publicId) {
            const result = await cloudinary.uploader.destroy(publicId);
            console.log("Cloudinary deletion result:", result);
          } else {
            console.log(
              "Could not extract publicId from image URL:",
              news.iconUrl
            );
          }
        }
        await NewsCategory.findByIdAndDelete(newsId);
    
        res
          .status(200)
          .json({ success: true, message: "Category deleted successfully" });
      } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({ success: false, message: "Server error", error });
      }
};

module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
