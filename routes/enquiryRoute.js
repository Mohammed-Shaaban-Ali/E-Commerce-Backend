const router = require("express").Router();

const {
  getallenquiry,
  createenquiry,
  getsingleenquiry,
  updateenquiry,
  deleteenquiry,
} = require("../controller/enquiryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// api/enquiry/
router
  .route("/")
  .get(authMiddleware, isAdmin, getallenquiry)
  .post(createenquiry);

// api/enquiry/:id
router
  .route("/:id")
  .get(getsingleenquiry)
  .put(authMiddleware, isAdmin, updateenquiry)
  .delete(authMiddleware, isAdmin, deleteenquiry);

module.exports = router;
