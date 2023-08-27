const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const validateMongodb = require("../utils/validateMongodb");
var slugify = require("slugify");
const User = require("../models/User");

/**--------------------------------
 * @description create New product
 * @route /api/product/
 * @method POST
 * @access public
------------------------------------*/
module.exports.createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newproduct = await Product.create(req.body);
    res.json(newproduct);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get product
 * @route /api/product/:id
 * @method get
 * @access public
------------------------------------*/
module.exports.getProduct = asyncHandler(async (req, res) => {
  try {
    validateMongodb(req.params.id);
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update product
 * @route /api/product/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.updateProduct = asyncHandler(async (req, res) => {
  try {
    validateMongodb(req.params.id);
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description delete product
 * @route /api/product/:id
 * @method delete
 * @access public
------------------------------------*/
module.exports.deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodb(id);
    const product = await Product.findByIdAndDelete(id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description get all products
 * @route /api/product/
 * @method get
 * @access public
------------------------------------*/
module.exports.getAllProduct = asyncHandler(async (req, res) => {
  try {
    // fillter
    const queryObj = { ...req.query };
    const excludeFile = ["page", "sort", "limit", "fields"];
    excludeFile.forEach((el) => delete queryObj[el]);
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|let|lt)\b/g,
      (match) => `$${match}`
    );
    let query = Product.find(JSON.parse(queryString));

    // sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createAt");
    }

    // limiting the fields
    if (req.query.fields) {
      const field = req.query.fields.split(",").join(" ");
      query = query.select(field);
    } else {
      query = query.select("-__v");
    }

    //pagenation
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;

    query = await query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      console.log({
        page: page,
        limit: limit,
        skip: skip,
        productCount: productCount,
      });

      if (skip >= productCount) throw new Error("This Page does not exist");
    }

    const products = await query;
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description addToWishlist
 * @route /api/product/wishlist
 * @method put
 * @access public
------------------------------------*/
module.exports.addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description total Rating
 * @route /api/product/rating
 * @method put
 * @access public
------------------------------------*/
module.exports.totalRating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, prodId } = req.body;
  try {
    const product = await Product.findById(prodId);
    const alreadyRating = product.ratings.find(
      (id) => id.postedby.toString() === _id.toString()
    );
    if (alreadyRating) {
      const updateProduct = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRating },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProudect = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
    }
    const getAllRating = await Product.findById(prodId);
    let totalRating = getAllRating.ratings.length;
    let sumRating = getAllRating.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(sumRating / totalRating);
    const finalproduct = await Product.findByIdAndUpdate(
      prodId,
      { totalrating: actualRating },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});
