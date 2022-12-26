const { Schema } = require('mongoose');
const virtuals = require('./payment.virtual');

const Payment = new Schema(
  {
    invoice: {
      type: String,
      unique: true,
    },
    amount: Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'order',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

for (const name in virtuals) {
  Payment.virtual(name, virtuals[name]);
}

module.exports = Payment;
