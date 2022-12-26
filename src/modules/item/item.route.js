const { Router } = require('../../common/router');
const { createRequestValidator } = require('../../common/request-validator');
const { createUploadMiddleware } = require('../../common/upload');
const createGroupRoleMiddleware = require('../role/group-role.middleware.js');

const ItemController = require('./item.controller');
const ItemRequest = require('./requests');
const authMiddleware = require('../auth/auth.middleware.js');

module.exports = Router([
  {
    path: '/items',
    method: 'get',
    handler: [authMiddleware, ItemController.get],
  },
  {
    path: '/items',
    method: 'post',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createRequestValidator(ItemRequest.create),
      ItemController.create,
    ],
  },
  {
    path: '/items/:id',
    method: 'get',
    handler: [authMiddleware, ItemController.find],
  },
  {
    path: '/items/:id',
    method: 'patch',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createRequestValidator(ItemRequest.update),
      ItemController.update,
    ],
  },
  {
    path: '/items/:id',
    method: 'delete',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      ItemController.delete,
    ],
  },
  {
    path: '/items/:id/photo',
    method: 'patch',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createUploadMiddleware(ItemRequest.uploadPhoto),
      ItemController.updatePhoto,
    ],
  },
]);
