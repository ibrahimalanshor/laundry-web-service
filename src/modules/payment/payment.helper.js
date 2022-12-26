const PaymentQuery = require('./payment.query.js');

exports.getLatestInvoice = async function () {
  const latestPayment = await new PaymentQuery().sort('-invoice').find();
  const latestNo =
    (latestPayment ? parseInt(latestPayment.invoice.slice(1)) : 0) + 1;

  return 'P' + latestNo.toString().padStart(4, 0);
};
