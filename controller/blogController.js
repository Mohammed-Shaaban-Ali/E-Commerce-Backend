const asyncHandler = require("express-async-handler");
const validateMongodb = require("../utils/validateMongodb");
const User = require("../models/User");
const Blog = require("../models/Blog");
const { cloudinaryUploadImg } = require("../utils/cloudinary");
const fs = require("fs");

/**--------------------------------
 * @description create Blog
 * @route /api/blog/
 * @method POST
 * @access Admin
------------------------------------*/
module.exports.createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update Blog
 * @route /api/blog/:id
 * @method put
 * @access Admin
------------------------------------*/
module.exports.updateBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});
/**--------------------------------
 * @description get Blog
 * @route /api/blog/:id
 * @method get
 * @access Admin
------------------------------------*/
module.exports.getBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViwes: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description delete Blog
 * @route /api/blog/:id
 * @method delete
 * @access Admin
------------------------------------*/
module.exports.deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get all Blog
 * @route /api/blog/
 * @method get
 * @access Admin
------------------------------------*/
module.exports.getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getAllBlog = await Blog.find();
    res.json(getAllBlog);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description like
 * @route /api/blog/likes
 * @method get
 * @access Admin
------------------------------------*/
module.exports.likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodb(blogId);

  const blog = await Blog.findById(blogId);
  const loginUser = req?.user?._id;
  const isLiked = blog?.isLiked;
  const alreadyDisLike = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUser.toString()
  );
  if (alreadyDisLike) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUser },
        isDisLiked: false,
      },
      { new: true }
    );
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUser },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUser },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

/**--------------------------------
 * @description disLike
 * @route /api/blog/dis-likes
 * @method get
 * @access Admin
------------------------------------*/
module.exports.disLikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodb(blogId);

  const blog = await Blog.findById(blogId);
  const loginUser = req?.user?._id;
  const isDisLiked = blog?.isDisLiked;
  const alreadyDisLike = blog?.likes?.find(
    (userId) => userId?.toString() === loginUser.toString()
  );
  if (alreadyDisLike) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUser },
        isLiked: false,
      },
      { new: true }
    );
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUser },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUser },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
/**--------------------------------
 * @description uploade image
 * @route /api/product/uploade
 * @method put
 * @access public
------------------------------------*/
module.exports.uploadeImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodb(id);
  try {
    const upload = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (let file of files) {
      const { path } = file;
      const newpath = await upload(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
