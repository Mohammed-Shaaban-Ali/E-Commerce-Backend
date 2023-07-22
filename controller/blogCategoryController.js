const asyncHandler = require("express-async-handler");
const validateMongodb = require("../utils/validateMongodb");
const BlogCategory = require("../models/BlogCategory");

/**--------------------------------
 * @description create blog category
 * @route /api/blog-category/
 * @method post
 * @access public
------------------------------------*/
module.exports.createblogCategory = asyncHandler(async (req, res) => {
  try {
    const newblogCategory = await BlogCategory.create(req.body);
    res.json(newblogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get all blog category
 * @route /api/blog-category/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getallblogCategory = asyncHandler(async (req, res) => {
  try {
    const getallblogCategory = await BlogCategory.find();
    res.json(getallblogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update blog category
 * @route /api/blog-category/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.updateblogCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const updateblogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updateblogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description delete blog category
 * @route /api/blog-category/:id
 * @method Delete
 * @access public
------------------------------------*/
module.exports.deleteblogCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const deleteblogCategory = await BlogCategory.findByIdAndDelete(id);
    res.json(deleteblogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get single blog category
 * @route /api/blog-category/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getsingleblogCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const getsingleblogCategory = await BlogCategory.findById(id);
    res.json(getsingleblogCategory);
  } catch (error) {
    throw new Error(error);
  }
});
