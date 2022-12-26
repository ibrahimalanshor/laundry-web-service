exports.user = {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
};
exports.packet = {
  ref: 'packet',
  localField: 'packetId',
  foreignField: '_id',
  justOne: true,
};
