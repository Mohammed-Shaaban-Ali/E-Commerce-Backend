const router = require("express").Router();

const { uploadeImage, deleteImage } = require("../controller/uploadController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");

// api/upload/
router
  .route("/")
  .post(
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadeImage
  );

// api/upload/delete-image/:id
router.route("/delete-image/:id").delete(authMiddleware, isAdmin, deleteImage);

module.exports = router;
