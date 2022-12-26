const { Schema } = require('mongoose');
const virtuals = require('./order.virtual');
const OrderDetailSchema = require('./detail/order-detail.schema.js');

const OrderSchema = new Schema(
  {
    invoice: {
      type: String,
      unique: true,
    },
    details: [OrderDetailSchema],
    estimatedFinishAt: Date,
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['created', 'processed', 'finished', 'taken', 'deleted'],
      default: 'created',
    },
    totalPrice: Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    packetId: {
      type: Schema.Types.ObjectId,
      ref: 'packet',
    },
    perfumeId: {
      type: Schema.Types.ObjectId,
      ref: 'perfume',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

for (const name in virtuals) {
  OrderSchema.virtual(name, virtuals[name]);
}

module.exports = OrderSchema;
