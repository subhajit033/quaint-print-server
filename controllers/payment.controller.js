const APPError = require('../utils/ErrorHandler');
const successResponse = require('../utils/sucessResponse');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

const createOrder = async (req, res, next) => {
  console.log(req.body);
  let totalValue = 0;
  const { cartIds } = req.body;
  for (let i = 0; i < cartIds.length; i++) {
    const cartItem = await Cart.findById(cartIds[i]);
    totalValue = totalValue + cartItem.price * cartItem.quantity;
  }

  const options = {
    amount: totalValue * 100,
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const data = await razorpay.orders.create(options);
    res.status(200).json({ data });
  } catch (e) {
    next(new APPError('Order creation failed', 400));
  }
};

const verifyOrder = async (req, res, next) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RZP_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      console.log(payment.notes);
      try {
        const { cartIds, userId, address } = payment.notes;
        const cartItem = cartIds.split(',');
        for (let i = 0; i < cartItem.length; i++) {
          try {
            const docCount = await Order.countDocuments({}); // Assuming this returns a number

            // Get the current date
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            // Combine year, month, and day into the desired format
            const formattedDate = `${year}${month}${day}`;

            // Increment docCount by 1 and pad with zeros accordingly
            const paddedDocCount = String(docCount + 1).padStart(3, '0'); // Add leading zeros if docCount is < 100

            // Create the final formatted order string
            const orderNumber = `ORD-${formattedDate}-${paddedDocCount}`;
            await Order.create({
              product: cartItem[i],
              user: userId,
              address: JSON.parse(address),
              orderId: orderNumber,
            });
          } catch (e) {
            return next(new APPError(e.message), 400);
          }
        }

        res.redirect(`http://localhost:5173/payment/success`);

        // const saveuser = await User.findById(saveduser._id).select('-__v');
      } catch (error) {
        console.log(error);
        return next(
          new APPError('Some problem happened while creating the user', 400)
        );
      }
    } else {
      return next(new APPError('Invalid signature', 400));
    }
  } catch (error) {
    console.log(error);
    next(new APPError(error.message, 500));
  }
};

module.exports = { createOrder, verifyOrder };
