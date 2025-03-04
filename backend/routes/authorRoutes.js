const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { verifyToken } = require("../middleware/Auth");
const { addAuthor, deleteAuthor, getAllAuthors, updateAuthor } = require("../controllers/AuthorController");



cloudinary.config({
  cloud_name: "dcfm0aowt",
  api_key: "576798684156725",
  api_secret: "bhhXx57-OdaxvDdZOwaUKNvBXOA"
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profileImage",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [
      {
        crop: "fill",
        gravity: "center",
        quality: "auto:best", // Automatically optimizes quality while maintaining visual fidelity
      },
    ],
  },
});
const upload = multer({ storage: storage });

router.post("/addAuthor", upload.single("profileImage"),addAuthor);
router.get("/getAllAuthors", getAllAuthors);;
router.delete("/deleteAuthor",deleteAuthor);
router.get("/getAllAuthors/:newsId",getAllAuthors)
router.put("/updateAuthor",upload.single("profileImage"),updateAuthor)
module.exports = router;
