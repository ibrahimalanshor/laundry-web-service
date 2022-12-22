const { Router } = require('../../common/router');
const { createRequestValidator } = require('../../common/request-validator');
const { createUploadMiddleware } = require('../../common/upload');
const createGroupRoleMiddleware = require('../role/group-role.middleware.js');

const PacketController = require('./packet.controller');
const PacketRequest = require('./requests');
const authMiddleware = require('../auth/auth.middleware.js');

module.exports = Router([
  {
    path: '/packets',
    method: 'get',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      PacketController.get,
    ],
  },
  {
    path: '/packets',
    method: 'post',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createRequestValidator(PacketRequest.create),
      PacketController.create,
    ],
  },
  {
    path: '/packets/:id',
    method: 'get',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      PacketController.find,
    ],
  },
  {
    path: '/packets/:id',
    method: 'patch',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createRequestValidator(PacketRequest.update),
      PacketController.update,
    ],
  },
  {
    path: '/packets/:id',
    method: 'delete',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      PacketController.delete,
    ],
  },
  {
    path: '/packets/:id/photo',
    method: 'patch',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createUploadMiddleware(PacketRequest.uploadPhoto),
      PacketController.updatePhoto,
    ],
  },
]);
