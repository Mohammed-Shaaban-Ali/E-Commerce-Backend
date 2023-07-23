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
} = require("../controller/authController");
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

// api/user/forgot-password-token
router.route("/forgot-password-token").post(forgotPasswordToken);

// api/user/reset-password
router.route("/reset-password/:token").put(resetPassword);

// api/user/all-users
router.route("/all-users").get(getAllUserCtrl);

// api/user/refresh
router.route("/refresh").get(handleRefreashToken);

// api/user/logout
router.route("/logout").get(logoutUser);

// api/user/wishlist
router.route("/wishlist").get(authMiddleware, getWishList);

// api/user/save-address
router.route("/save-address").put(authMiddleware, saveAddres);

// api/user/:id
router
  .route("/:id")
  .get(authMiddleware, isAdminOrUserHimself, getloginUserCtrl)
  .delete(authMiddleware, isAdminOrUserHimself, deleteUserCtrl)
  .put(authMiddleware, isAdminOrUserHimself, updateUserCtrl);

// api/user/bloch-user/:id
router.route("/bloch-user/:id").put(authMiddleware, isAdmin, blockUserCtrl);
// api/user/unbloch-user/:id
router.route("/unbloch-user/:id").put(authMiddleware, isAdmin, unblockUserCtrl);

module.exports = router;
