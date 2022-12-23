const OrderQuery = require('./order.query.js');
const dateHelper = require('../../common/helpers/date.js');

exports.getLatestInvoice = async function () {
  const latestOrder = await new OrderQuery()
    .where(
      'createdAt',
      {
        $gte: dateHelper.getStartOfTheDay(),
        $lte: dateHelper.getEndOfTheDay(),
      },
      { customOperator: true }
    )
    .sort('-invoice')
    .find();
  const latestNo =
    (latestOrder ? parseInt(latestOrder.invoice.slice(1)) : 0) + 1;

  return 'T' + latestNo.toString().padStart(4, 0);
};

exports.countEstimatedFinishAt = async function (packet) {
  return packet.processing_time_type === 'hari'
    ? dateHelper.addDay(packet.processing_time)
    : dateHelper.addHour(packet.processing_time);
};

exports.countTotalPrice = async function (packet, details) {
  return (
    packet.price * details.reduce((total, current) => total + current.qty, 0)
  );
};
