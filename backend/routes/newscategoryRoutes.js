const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { verifyToken } = require("../middleware/Auth");
const { addCategory, getAllCategories, deleteCategory, getCategoryById, updateCategory } = require("../controllers/NewsCategoryController");


cloudinary.config({
  cloud_name: "dcfm0aowt",
  api_key: "576798684156725",
  api_secret: "bhhXx57-OdaxvDdZOwaUKNvBXOA"
});
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "category",
//     allowed_formats: ["jpg", "png", "jpeg", "webp","svg"],
//     transformation: [
//       {
//         crop: "fill",
//         gravity: "center",
//         quality: "auto:best", // Automatically optimizes quality while maintaining visual fidelity
//       },
//     ],
//   },
// });
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const isSVG = file.mimetype === "image/svg+xml";
  
      return {
        folder: "category",
        allowed_formats: ["jpg", "png", "jpeg", "webp", "svg"],
        transformation: isSVG
          ? [] // No transformations for SVG
          : [
              {
                crop: "fill",
                gravity: "center",
                quality: "auto:best",
              },
            ],
      };
    },
  });
  
const upload = multer({ storage: storage });

router.post("/addCategory", upload.single("category"),addCategory);
router.get("/getAllCategories", getAllCategories);;
router.delete("/deleteCategory",deleteCategory);
router.get("/getCategoryById/:newsId",getCategoryById)
router.put("/updateCategory",upload.single("category"),updateCategory)
module.exports = router;
