const router = require("express").Router();

const {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
  getSingleCoupon,
} = require("../controller/couponContrller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// api/coupon/
router
  .route("/")
  .post(authMiddleware, isAdmin, createCoupon)
  .get(authMiddleware, isAdmin, getAllCoupon);

// api/coupon/:id
router
  .route("/:id")
  .put(authMiddleware, isAdmin, updateCoupon)
  .delete(authMiddleware, isAdmin, deleteCoupon)
  .get(authMiddleware, isAdmin, getSingleCoupon);

module.exports = router;
