const mongoose = require("mongoose");

const validateMongodb = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This is not a valid ID or not found");
};
module.exports = validateMongodb;
