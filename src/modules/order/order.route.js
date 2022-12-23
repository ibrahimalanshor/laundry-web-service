const { Router } = require('../../common/router');
const { createRequestValidator } = require('../../common/request-validator');

const OrderController = require('./order.controller');
const OrderRequest = require('./requests');
const authMiddleware = require('../auth/auth.middleware.js');

module.exports = Router([
  {
    path: '/orders',
    method: 'get',
    handler: [authMiddleware, OrderController.get],
  },
  {
    path: '/orders',
    method: 'post',
    handler: [
      authMiddleware,
      createRequestValidator(OrderRequest.create),
      OrderController.create,
    ],
  },
  {
    path: '/orders/:id',
    method: 'get',
    handler: [authMiddleware, OrderController.find],
  },
  {
    path: '/orders/:id',
    method: 'delete',
    handler: [authMiddleware, OrderController.delete],
  },
]);
