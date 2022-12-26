const { Router } = require('../../common/router');
const createGroupRoleMiddleware = require('../role/group-role.middleware.js');
const { createRequestValidator } = require('../../common/request-validator');

const PaymentController = require('./payment.controller');
const PaymentRequest = require('./requests');
const authMiddleware = require('../auth/auth.middleware.js');

module.exports = Router([
  {
    path: '/payments',
    method: 'get',
    handler: [authMiddleware, PaymentController.get],
  },
  {
    path: '/payments',
    method: 'post',
    handler: [
      authMiddleware,
      createRequestValidator(PaymentRequest.create),
      PaymentController.create,
    ],
  },
  {
    path: '/payments/:id',
    method: 'delete',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      PaymentController.delete,
    ],
  },
]);
