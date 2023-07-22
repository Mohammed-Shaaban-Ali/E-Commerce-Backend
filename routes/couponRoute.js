const router = require("express").Router();

const { createCoupon } = require("../controller/couponContrller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// api/coupon/
router.route("/").post(authMiddleware, isAdmin, createCoupon);

module.exports = router;
