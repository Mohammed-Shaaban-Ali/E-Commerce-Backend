const asyncHandler = require("express-async-handler");
const validateMongodb = require("../utils/validateMongodb");
const BrandCategory = require("../models/BrandCategory");

/**--------------------------------
 * @description create brand category
 * @route /api/brand-category/
 * @method post
 * @access public
------------------------------------*/
module.exports.createbrandCategory = asyncHandler(async (req, res) => {
  try {
    const newbrandCategory = await BrandCategory.create(req.body);
    res.json(newbrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get all brand category
 * @route /api/brand-category/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getallbrandCategory = asyncHandler(async (req, res) => {
  try {
    const getallbrandCategory = await BrandCategory.find();
    res.json(getallbrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update brand category
 * @route /api/brand-category/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.updatebrandCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const updatebrandCategory = await BrandCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatebrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description delete brand category
 * @route /api/brand-category/:id
 * @method Delete
 * @access public
------------------------------------*/
module.exports.deletebrandCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const deletebrandCategory = await BrandCategory.findByIdAndDelete(id);
    res.json(deletebrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get single brand category
 * @route /api/brand-category/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getsinglebrandCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const getsinglebrandCategory = await BrandCategory.findById(id);
    res.json(getsinglebrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});
