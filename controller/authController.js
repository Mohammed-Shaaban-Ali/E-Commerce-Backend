const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");
const Order = require("../models/Order");
var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const uniqid = require("uniqid");
const { generateToken } = require("../config/jwtToken");
const validateMongodb = require("../utils/validateMongodb");
const { generateRefreshToken } = require("../config/refreshToken");
const sendEmali = require("./emaliController");

/**--------------------------------
 * @description Register New User
 * @route /api/user/register
 * @method POST
 * @access public
------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // is user already registered
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    let mobile = await User.findOne({ mobile: req.body.mobile });
    if (!mobile) {
      const newUser = await User.create(req.body);
      return res.status(200).json({ message: "successfully registered" });
    } else {
      throw new Error("Mobile already exist");
    }
  } else {
    throw new Error("Email already exist");
  }
});

/**--------------------------------
 * @description login
 * @route /api/user/login
 * @method POST
 * @access public
------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(user?._id);
    const updateUser = await User.findByIdAndUpdate(
      user?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie(`refreshToken`, refreshToken, {
      httpOnly: true,
    });
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid login");
  }
});

/**--------------------------------
 * @description login admin
 * @route /api/user/login
 * @method POST
 * @access public
------------------------------------*/
module.exports.loginAdminCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user.role !== "admin") throw new Error("Not Authorized");

  if (user && (await user.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(user?._id);
    const updateUser = await User.findByIdAndUpdate(
      user?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie(`refreshToken`, refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid login");
  }
});
/**--------------------------------
 * @description handle refresh token
 * @route / api/user/refresh
 * @method put
 * @access public
------------------------------------*/
module.exports.handleRefreashToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json(accessToken);
  });
});

/**--------------------------------
 * @description logout
 * @route / api/user/logout
 * @method get
 * @access public
------------------------------------*/
module.exports.logoutUser = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

/**--------------------------------
 * @description Gett all users
 * @route /api/user/all-users
 * @method get
 * @access public
------------------------------------*/
module.exports.getAllUserCtrl = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description Get login user
 * @route /api/user/:id
 * @method get
 * @access public
------------------------------------*/
module.exports.getloginUserCtrl = asyncHandler(async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update user
 * @route /api/user/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.updateUserCtrl = asyncHandler(async (req, res) => {
  const id = req.user._id;
  validateMongodb(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description save addres user
 * @route /api/user/save-address
 * @method put
 * @access public
------------------------------------*/
module.exports.saveAddres = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodb(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    console.log(updatedUser.address);
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description Delete user
 * @route /api/user/:id
 * @method Delete
 * @access public
------------------------------------*/
module.exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  try {
    validateMongodb(req.params.id);
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ user });
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description block user
 * @route /api/user/bloch-user/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.blockUserCtrl = asyncHandler(async (req, res) => {
  try {
    validateMongodb(req.params.id);
    const block = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );
    res.json({ message: "User Blocked" });
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description unblock user
 * @route /api/user/unbloch-user/:id
 * @method put
 * @access public
------------------------------------*/
module.exports.unblockUserCtrl = asyncHandler(async (req, res) => {
  try {
    validateMongodb(req.params.id);
    const unblock = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );
    res.json({ message: "User UnBlocked" });
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
 * @description update password
 * @route /api/user/password
 * @method put
 * @access public
------------------------------------*/
module.exports.updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodb(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

/**--------------------------------
 * @description forgot password
 * @route /api/user/forgot-password-token
 * @method post
 * @access public
------------------------------------*/
module.exports.forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found With this email address");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const url = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='${process.env.URL_FRONTEND}/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot password link",
      html: url,
    };
    sendEmali(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
   * @description reset password
   * @route /api/user/reset-password
   * @method put
   * @access public
  ------------------------------------*/
module.exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  console.log(password);
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token expired, please try again");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

/**--------------------------------
   * @description getWishList
   * @route /api/user/wishlist
   * @method get
   * @access public
  ------------------------------------*/
module.exports.getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodb(_id);
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
   * @description userCart
   * @route /api/user/cart
   * @method post
   * @access public
  ------------------------------------*/
module.exports.userCart = asyncHandler(async (req, res) => {
  const { productId, userId, quantity, price, color } = req.body;
  const { _id } = req.user;
  validateMongodb(_id);

  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      quantity,
      price,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
   * @description getuserCart
   * @route /api/user/cart
   * @method get
   * @access public
  ------------------------------------*/
module.exports.getuserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodb(_id);
  try {
    const cart = await Cart.find({ userId: _id })
      .populate("color")
      .populate("productId");
    // .populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
   * @description empty cart
   * @route /api/user/empty-cart
   * @method delet
   * @access public
  ------------------------------------*/
module.exports.emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodb(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderBy: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
   * @description remove cart
   * @route /api/user/remove-cart/:id
   * @method delet
   * @access public
  ------------------------------------*/
module.exports.removeCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  validateMongodb(_id);
  try {
    const removecart = await Cart.deleteOne({ userId: _id, _id: id });
    res.json(removecart);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
   * @description updateUSingQuantity
   * @route /api/user/remove-cart/:id
   * @method delet
   * @access public
  ------------------------------------*/
module.exports.updateUSingQuantity = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const { cartItemId, newQuantity } = req.params;
  // validateMongodb(_id);
  try {
    const cartItem = await Cart.findOne({
      userId: id,
      _id: cartItemId,
    });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(cartItem);
    console.log(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
   * @description applay coupon
   * @route /api/user/cart/applaycoupon
   * @method post
   * @access public
  ------------------------------------*/
module.exports.applaycoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongodb(_id);

  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid coupon");
  }
  let user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderBy: user._id,
  }).populate("products.product");

  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    {
      orderBy: user._id,
    },
    {
      totalAfterDiscount,
    },
    {
      new: true,
    }
  );
  res.json(totalAfterDiscount);
});

/**--------------------------------
   * @description create order
   * @route /api/user/cart/create-order
   * @method post
   * @access public
  ------------------------------------*/
module.exports.createorder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    paymentInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
  } = req.body;
  const { _id } = req.user;
  try {
    console.log({
      shippingInfo,
      paymentInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      user: _id,
    });
    const order = await Order.create({
      shippingInfo,
      paymentInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      user: _id,
    });

    res.json({ order, success: true });
  } catch (error) {
    throw new Error(error);
  }
});

/**--------------------------------
   * @description get my order
   * @route /api/user/cart/getmyorder
   * @method get
   * @access public
  ------------------------------------*/
module.exports.getMyOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ user: _id })
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});
