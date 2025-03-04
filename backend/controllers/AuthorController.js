const Author = require("../models/authorsModel")
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

const getPublicIdFromUrl = (url) => {
    const regex = /\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/;
    const match = url.match(regex);
    if (match) {
        return `${match[1]}/${match[2]}`;
    }
    return null;
};

const addAuthor = async (req, res) => {
    try {
        const profilepic = req.file.path;
        const { name, about, article } = req.body;
console.log(req.body,"author");

        const author = new Author({ name, about, article, profilepic });
        await author.save();

        return res.status(200).send({
            success: true,
            message: "Author added successfully",
            author
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while adding the author",
            error: error.message,
        });
    }
};

const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find({});
        return res.status(200).send({
            success: true,
            message: "Authors fetched successfully",
            authors,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while fetching authors",
            error: error.message,
        });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { authorId } = req.body;
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }
        if (author.profilepic) {
            const publicId = getPublicIdFromUrl(author.profilepic);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }
        await Author.findByIdAndDelete(authorId);
        res.status(200).json({ success: true, message: "Author deleted successfully" });
    } catch (error) {
        console.error("Error deleting author:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.authorId);
        if (!author) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }
        res.status(200).json({ success: true, author });
    } catch (error) {
        console.error("Error fetching author:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { authorId, name, about, article } = req.body;
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }

        let profilepic = author.profilepic;
        if (req.file) {
            if (profilepic) {
                const publicId = getPublicIdFromUrl(profilepic);
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
            }
            profilepic = req.file.path;
        }

        author.name = name || author.name;
        author.about = about || author.about;
        author.article = article || author.article;
        author.profilepic = profilepic;
        await author.save();

        res.status(200).json({ success: true, message: "Author updated successfully", author });
    } catch (error) {
        console.error("Error updating author:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = {
    addAuthor,
    getAllAuthors,
    deleteAuthor,
    getAuthorById,
    updateAuthor
};
