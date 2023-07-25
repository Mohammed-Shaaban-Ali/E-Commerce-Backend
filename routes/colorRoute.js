const router = require("express").Router();

const {
  getallcolor,
  createcolor,
  getsinglecolor,
  updatecolor,
  deletecolor,
} = require("../controller/colorController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// api/color/
router.route("/").get(getallcolor).post(authMiddleware, isAdmin, createcolor);

// api/colory/:id
router
  .route("/:id")
  .get(getsinglecolor)
  .put(authMiddleware, isAdmin, updatecolor)
  .delete(authMiddleware, isAdmin, deletecolor);

module.exports = router;
