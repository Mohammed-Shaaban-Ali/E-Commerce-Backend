const asyncHandler = require("express-async-handler");
const validateMongodb = require("../utils/validateMongodb");
const Color = require("../models/Color");

/**--------------------------------
 * @description create color category
 * @route /api/color
 * @method post
 * @access public
------------------------------------*/
module.exports.createcolor = asyncHandler(async (req, res) => {
  try {
    const newcolor = await Color.create(req.body);
    res.json(newcolor);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get all color category
 * @route /api/color/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getallcolor = asyncHandler(async (req, res) => {
  try {
    const getallcolor = await Color.find();
    res.json(getallcolor);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update color 
 * @route /api/color/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.updatecolor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const updatecolor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecolor);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description delete color 
 * @route /api/color/:id
 * @method Delete
 * @access public
------------------------------------*/
module.exports.deletecolor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const deletecolor = await Color.findByIdAndDelete(id);
    res.json(deletecolor);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get single color category
 * @route /api/color/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getsinglecolor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const getsinglecolor = await Color.findById(id);
    res.json(getsinglecolor);
  } catch (error) {
    throw new Error(error);
  }
});
