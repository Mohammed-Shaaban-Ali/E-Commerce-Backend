const router = require("express").Router();
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadeImagelog,
  uploadeImage,
} = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImage");

// api/blog/
router.route("/").get(getAllBlog).post(authMiddleware, isAdmin, createBlog);

// api/blog/upload/:id
router
  .route("/upload/:id")
  .put(
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 2),
    blogImgResize,
    uploadeImage
  );
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
