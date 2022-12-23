const { Schema } = require('mongoose');

const OrderDetailSchema = new Schema({
  qty: Number,
  totalPrice: Number,
  packetItemId: {
    type: Schema.Types.ObjectId,
    ref: 'packet_item',
  },
});

module.exports = OrderDetailSchema;
