const router = require("express").Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  getAllUserCtrl,
  getloginUserCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  unblockUserCtrl,
  blockUserCtrl,
  handleRefreashToken,
  logoutUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdminCtrl,
  getWishList,
  saveAddres,
  userCart,
  getuserCart,
  emptyCart,
  applaycoupon,
  // createorder,
  // getorder,
  // updateorder,
  // getallorder,
  // getorderbyid,
  removeCart,
  updateUSingQuantity,
  createorder,
  getMyOrder,
  getMonthWiseOrderIncom,
  getYearsTotalOrders,
  getallOrder,
} = require("../controller/authController");
const {
  checkout,
  paymentVerification,
} = require("../controller/paymentController");
const {
  authMiddleware,
  isAdmin,
  isAdminOrUserHimself,
} = require("../middlewares/authMiddleware");

// api/user/register
router.route("/register").post(registerUserCtrl);

// api/user/login
router.route("/login").post(loginUserCtrl);

// api/user/admin-login
router.route("/admin-login").post(loginAdminCtrl);

// api/user/password
router.route("/password").put(authMiddleware, updatePassword);

// api/user/all-users
router.route("/all-users").get(getAllUserCtrl);

// api/user/forgot-password-token
router.route("/forgot-password-token").post(forgotPasswordToken);

// api/user/refresh
router.route("/refresh").get(handleRefreashToken);

// api/user/reset-password
router.route("/reset-password/:token").put(resetPassword);

// api/user/logout
router.route("/logout").get(logoutUser);

// api/user/wishlist
router.route("/wishlist").get(authMiddleware, getWishList);

// api/user/save-address
router.route("/save-address").put(authMiddleware, saveAddres);

// api/user/empty-cart
router.route("/empty-cart").delete(authMiddleware, emptyCart);
// api/user/cart
router
  .route("/cart")
  .get(authMiddleware, getuserCart)
  .post(authMiddleware, userCart);

// api/user/getMonthWiseOrderIncom
router
  .route("/getMonthWiseOrderIncom")
  .get(authMiddleware, isAdmin, getMonthWiseOrderIncom);

// api/user/getYearsTotalOrders
router
  .route("/getYearsTotalOrders")
  .get(authMiddleware, isAdmin, getYearsTotalOrders);

// api/user/order/checkout
router.route("/order/checkout").post(authMiddleware, checkout);

// api/user/order/paymentVerification
router
  .route("/order/paymentVerification")
  .post(authMiddleware, paymentVerification);

// api/user/remove-cart/:id
router.route("/remove-cart/:id").delete(authMiddleware, removeCart);
// api/user/remove-cart/:id
router
  .route("/updateCartItem/:newQuantity/:cartItemId")
  .put(authMiddleware, updateUSingQuantity);

// api/user/cart/applaycoupon
router.route("/cart/applaycoupon").post(authMiddleware, applaycoupon);
// api/user/cart/create-order
router.route("/cart/create-order").post(authMiddleware, createorder);
// // api/user/cart/get-orders

// api/user/cart/get-orders
router.route("/cart/myorder").get(authMiddleware, getMyOrder);
// api/user/cart/get-all-orders
router.route("/cart/get-all-orders").get(getallOrder);

// api/user/bloch-user/:id
router.route("/bloch-user/:id").put(authMiddleware, isAdmin, blockUserCtrl);
// api/user/unbloch-user/:id
router.route("/unbloch-user/:id").put(authMiddleware, isAdmin, unblockUserCtrl);

// api/user/:id
router
  .route("/")
  .get(authMiddleware, getloginUserCtrl)
  .delete(authMiddleware, deleteUserCtrl)
  .put(authMiddleware, updateUserCtrl);

// // api/user/order/update-order/:id
// router
//   .route("/order/update-order/:id")
//   .put(authMiddleware, isAdmin, updateorder);

module.exports = router;
