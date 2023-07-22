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

//  api/product/upload/:id
router
  .route("/upload/:id")
  .put(
    authMiddleware,
    isAdmin,
    uploadPhoto.array("image", 10),
    productImgResize,
    uploadeImage
  );

// api/product/wishlist
router.route("/wishlist").put(authMiddleware, addToWishlist);

// api/product/rating
router.route("/rating").put(authMiddleware, totalRating);

// api/product/:id
router
  .route("/:id")
  .get(getProduct)
  .delete(authMiddleware, isAdmin, deleteProduct)
  .put(authMiddleware, isAdmin, updateProduct);

module.exports = router;
