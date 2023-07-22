const router = require("express").Router();

const {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getallProductCategory,
  getsingleProductCategory,
} = require("../controller/productCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// api/product-category/
router
  .route("/")
  .get(getallProductCategory)
  .post(authMiddleware, isAdmin, createProductCategory);

// api/product-category/:id
router
  .route("/:id")
  .get(getsingleProductCategory)
  .put(authMiddleware, isAdmin, updateProductCategory)
  .delete(authMiddleware, isAdmin, deleteProductCategory);

module.exports = router;
