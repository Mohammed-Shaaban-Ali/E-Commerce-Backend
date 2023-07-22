var jwt = require("jsonwebtoken");

module.exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};
