const asyncHandler = require("express-async-handler");
const validateMongodb = require("../utils/validateMongodb");
const Enquiry = require("../models/Enquiry");

/**--------------------------------
 * @description create enquiry 
 * @route /api/enquiry
 * @method post
 * @access public
------------------------------------*/
module.exports.createenquiry = asyncHandler(async (req, res) => {
  try {
    const newenquiry = await Enquiry.create(req.body);
    res.json(newenquiry);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get all enquiry 
 * @route /api/enquiry/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getallenquiry = asyncHandler(async (req, res) => {
  try {
    const getallenquiry = await Enquiry.find();
    res.json(getallenquiry);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update enquiry 
 * @route /api/enquiry/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.updateenquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const updateenquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateenquiry);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description delete enquiry 
 * @route /api/enquiry/:id
 * @method Delete
 * @access public
------------------------------------*/
module.exports.deleteenquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const deleteenquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deleteenquiry);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get single enquiry category
 * @route /api/enquiry/
 * @method Delete
 * @access public
------------------------------------*/
module.exports.getsingleenquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const getsingleenquiry = await Enquiry.findById(id);
    res.json(getsingleenquiry);
  } catch (error) {
    throw new Error(error);
  }
});
