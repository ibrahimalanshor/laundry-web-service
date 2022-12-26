exports.user = {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
};
exports.order = {
  ref: 'order',
  localField: 'orderId',
  foreignField: '_id',
  justOne: true,
};
