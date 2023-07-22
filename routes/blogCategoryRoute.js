const router = require("express").Router();

const {
  getallblogCategory,
  createblogCategory,
  getsingleblogCategory,
  updateblogCategory,
  deleteblogCategory,
} = require("../controller/blogCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// api/blog-category/
router
  .route("/")
  .get(getallblogCategory)
  .post(authMiddleware, isAdmin, createblogCategory);

// api/blog-category/:id
router
  .route("/:id")
  .get(getsingleblogCategory)
  .put(authMiddleware, isAdmin, updateblogCategory)
  .delete(authMiddleware, isAdmin, deleteblogCategory);

module.exports = router;
