const { Router } = require('../../common/router');
const { createRequestValidator } = require('../../common/request-validator');

const PacketController = require('./packet.controller');
const PacketRequest = require('./requests');
const authMiddleware = require('../auth/auth.middleware.js');

module.exports = Router([
  {
    path: '/packets',
    method: 'get',
    handler: [authMiddleware, PacketController.get],
  },
  {
    path: '/packets',
    method: 'post',
    handler: [
      authMiddleware,
      createRequestValidator(PacketRequest.create),
      PacketController.create,
    ],
  },
  {
    path: '/packets/:id',
    method: 'get',
    handler: [authMiddleware, PacketController.find],
  },
  {
    path: '/packets/:id',
    method: 'patch',
    handler: [
      authMiddleware,
      createRequestValidator(PacketRequest.update),
      PacketController.update,
    ],
  },
  {
    path: '/packets/:id',
    method: 'delete',
    handler: [authMiddleware, PacketController.delete],
  },
]);
