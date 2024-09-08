const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Order = model('Order', orderSchema);
module.exports = Order;
