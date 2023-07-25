const router = require("express").Router();
const {
  createProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  addToWishlist,
  totalRating,
  uploadeImage,
  deleteImage,
} = require("../controller/productController");
const {
  authMiddleware,
  isAdmin,
  isAdminOrUserHimself,
} = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");

// api/product/
router
  .route("/")
  .post(authMiddleware, isAdmin, createProduct)
  .get(getAllProduct);

// api/product/wishlist
router.route("/wishlist").put(authMiddleware, addToWishlist);

// api/product/upload/
router
  .route("/upload/")
  .put(
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadeImage
  );

// api/product/delete-image/:id
router.route("/delete-image/:id").delete(authMiddleware, isAdmin, deleteImage);

// api/product/rating
router.route("/rating").put(authMiddleware, totalRating);

// api/product/:id
router
  .route("/:id")
  .get(getProduct)
  .delete(authMiddleware, isAdmin, deleteProduct)
  .put(authMiddleware, isAdmin, updateProduct);

module.exports = router;
