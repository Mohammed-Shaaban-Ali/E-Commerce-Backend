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

/**--------------------------------
 * @description get all coupon
 * @route /api/coupon/
 * @method get
 * @access public
------------------------------------*/
module.exports.getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.find();
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update coupon
 * @route /api/coupon/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodb(id);
  try {
    const coupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});
/**--------------------------------
 * @description delete coupon
 * @route /api/coupon/:id
 * @method delete
 * @access public
------------------------------------*/
module.exports.deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodb(id);
  try {
    const coupon = await Coupon.findByIdAndDelete(id);
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});
