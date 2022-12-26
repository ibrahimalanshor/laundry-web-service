const { Schema } = require('mongoose');
const virtuals = require('./review.virtual');

const Review = new Schema(
  {
    content: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

for (const name in virtuals) {
  Review.virtual(name, virtuals[name]);
}

module.exports = Review;
