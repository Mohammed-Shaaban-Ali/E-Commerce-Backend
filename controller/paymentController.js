const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
const checkout = async (req, res) => {
  const option = {
    amount: 50000, // amount in smallest currency unit
    currency: "INR",
  };

  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrder, razorpayPaymentId } = req.body;
  res.json({
    razorpayOrder,
    razorpayPaymentId,
  });
};
module.exports = {
  checkout,
  paymentVerification,
};
