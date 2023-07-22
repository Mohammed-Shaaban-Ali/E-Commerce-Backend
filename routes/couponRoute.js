const router = require("express").Router();

const {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
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
  .post(authMiddleware, isAdmin, updateCoupon)
  .get(authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
