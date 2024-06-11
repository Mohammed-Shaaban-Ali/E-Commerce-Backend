const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

module.exports.authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized toke expired, please login ");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

module.exports.isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    throw new Error("You are not allowed, only admins can");
  } else {
    next();
  }
});

module.exports.isAdminOrUserHimself = asyncHandler(async (req, res, next) => {
  const { role, _id } = req.user;
  const { id } = req.params;

  if (role === "admin" || _id == id) {
    next();
  } else {
    throw new Error("You are not allowed, only admins can or user himself ");
  }
});
