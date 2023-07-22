const router = require("express").Router();

const {
  getallbrandCategory,
  createbrandCategory,
  getsinglebrandCategory,
  updatebrandCategory,
  deletebrandCategory,
} = require("../controller/brandCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// api/brand-category/
router
  .route("/")
  .get(getallbrandCategory)
  .post(authMiddleware, isAdmin, createbrandCategory);

// api/brand-category/:id
router
  .route("/:id")
  .get(getsinglebrandCategory)
  .put(authMiddleware, isAdmin, updatebrandCategory)
  .delete(authMiddleware, isAdmin, deletebrandCategory);

module.exports = router;
