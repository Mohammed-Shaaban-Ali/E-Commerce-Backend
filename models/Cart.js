const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ColorCategory",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
