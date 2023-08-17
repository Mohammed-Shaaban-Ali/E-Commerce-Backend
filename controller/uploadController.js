const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");

/**--------------------------------
 * @description uploade image
 * @route /api/uploade
 * @method put
 * @access public
------------------------------------*/
module.exports.uploadeImage = asyncHandler(async (req, res) => {
  try {
    const upload = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (let file of files) {
      const { path } = file;
      const newpath = await upload(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });

    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description delete image
 * @route /api/product/delete-image/:id
 * @method delete
 * @access public
------------------------------------*/
module.exports.deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const upload = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted success" });
  } catch (error) {
    throw new Error(error);
  }
});
