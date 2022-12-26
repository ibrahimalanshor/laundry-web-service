const { Schema } = require('mongoose');
const virtuals = require('./order-detail.virtual');

const OrderDetailSchema = new Schema(
  {
    qty: Number,
    itemId: {
      type: Schema.Types.ObjectId,
      ref: 'item',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

for (const name in virtuals) {
  OrderDetailSchema.virtual(name, virtuals[name]);
}

module.exports = OrderDetailSchema;
