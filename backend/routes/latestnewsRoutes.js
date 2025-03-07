const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { verifyToken } = require("../middleware/Auth");
const { addNews, getAllNews, deleteNews, updateNews, getNewsById } = require("../controllers/LatestnewsController");


cloudinary.config({
  cloud_name: "dcfm0aowt",
  api_key: "576798684156725",
  api_secret: "bhhXx57-OdaxvDdZOwaUKNvBXOA"
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "latest",
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

router.post("/addNews", upload.single("latest"),addNews);
router.get("/getAllNews", getAllNews);;
router.delete("/deleteNews",deleteNews);
router.get("/getNewsById/:newsId",getNewsById)
router.put("/updateNews",upload.single("latest"),updateNews)
module.exports = router;
