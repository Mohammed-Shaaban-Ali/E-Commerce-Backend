const asyncHandler = require("express-async-handler");
const validateMongodb = require("../utils/validateMongodb");
const Coupon = require("../models/Coupon");

/**--------------------------------
 * @description create coupon
 * @route /api/coupon/
 * @method post
 * @access public
------------------------------------*/
module.exports.createCoupon = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});
