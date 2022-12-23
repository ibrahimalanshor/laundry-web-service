const { Schema } = require('mongoose');
const virtuals = require('./perfume.virtual');

const PerfumeSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    price: Number,
    stock: {
      type: Number,
      default: 0,
    },
    photo: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

for (const name in virtuals) {
  PerfumeSchema.virtual(name, virtuals[name]);
}

module.exports = PerfumeSchema;
