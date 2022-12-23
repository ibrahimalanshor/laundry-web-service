const { Schema } = require('mongoose');

const OrderDetailSchema = new Schema({
  qty: Number,
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'item',
  },
});

module.exports = OrderDetailSchema;
