const asyncHandler = require("express-async-handler");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exist");
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
    res.json({ accessToken });
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
    res.json({ users });
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
  try {
    validateMongodb(req.params.id);
    const user = await User.findById(req.params.id);
    res.json({ user });
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
  try {
    validateMongodb(req.params.id);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json({ user });
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
    const url = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:8000/api/user/reset-password/${token}'>Click Here</>`;
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
module.exports.getWishList = asyncHandler(async (req, res) => {});
