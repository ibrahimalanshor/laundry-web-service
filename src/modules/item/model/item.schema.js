const { Schema } = require('mongoose');
const virtuals = require('./item.virtual');

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
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
  ItemSchema.virtual(name, virtuals[name]);
}

module.exports = ItemSchema;
