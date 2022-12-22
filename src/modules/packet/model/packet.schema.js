const { Schema } = require('mongoose');
const virtuals = require('./packet.virtual');

const PacketSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      enum: ['satuan', 'kiloan'],
    },
    price: Number,
    processing_time: Number,
    processing_time_type: {
      type: String,
      enum: ['jam', 'hari'],
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
  PacketSchema.virtual(name, virtuals[name]);
}

module.exports = PacketSchema;
