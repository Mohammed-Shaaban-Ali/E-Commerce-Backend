const mongoose = require("mongoose");

const DBConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connection sccessed ^_^ ");
  } catch (error) {
    console.log("mongoose error");
  }
};

module.exports = DBConnect;
