const router = require("express").Router();
const {
  createProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  addToWishlist,
  totalRating,
} = require("../controller/productController");
const {
  authMiddleware,
  isAdmin,
  isAdminOrUserHimself,
} = require("../middlewares/authMiddleware");

// api/product/
router
  .route("/")
  .post(authMiddleware, isAdmin, createProduct)
  .get(getAllProduct);

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
