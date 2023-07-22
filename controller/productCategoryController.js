const asyncHandler = require("express-async-handler");
const validateMongodb = require("../utils/validateMongodb");
const ProductCategory = require("../models/ProductCategory");

/**--------------------------------
 * @description create product category
 * @route /api/product-category/
 * @method post
 * @access public
------------------------------------*/
module.exports.createProductCategory = asyncHandler(async (req, res) => {
  try {
    const newProductCategory = await ProductCategory.create(req.body);
    res.json(newProductCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get all product category
 * @route /api/product-category/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getallProductCategory = asyncHandler(async (req, res) => {
  try {
    const getallProductCategory = await ProductCategory.find();
    res.json(getallProductCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update product category
 * @route /api/product-category/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.updateProductCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const updateProductCategory = await ProductCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updateProductCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description delete product category
 * @route /api/product-category/:id
 * @method Delete
 * @access public
------------------------------------*/
module.exports.deleteProductCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const deleteProductCategory = await ProductCategory.findByIdAndDelete(id);
    res.json(deleteProductCategory);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get single product category
 * @route /api/product-category/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getsingleProductCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const getsingleProductCategory = await ProductCategory.findById(id);
    res.json(getsingleProductCategory);
  } catch (error) {
    throw new Error(error);
  }
});
