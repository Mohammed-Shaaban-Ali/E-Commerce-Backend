const router = require("express").Router();
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
} = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// api/blog/
router.route("/").get(getAllBlog).post(authMiddleware, isAdmin, createBlog);

// api/blog/likes
router.route("/likes").put(authMiddleware, likeBlog);
// api/blog/dis-likes
router.route("/dis-likes").put(authMiddleware, disLikeBlog);

// api/blog/:id
router
  .route("/:id")
  .get(getBlog)
  .put(authMiddleware, isAdmin, updateBlog)
  .delete(authMiddleware, isAdmin, deleteBlog);

module.exports = router;
