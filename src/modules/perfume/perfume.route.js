const { Router } = require('../../common/router');
const { createRequestValidator } = require('../../common/request-validator');
const { createUploadMiddleware } = require('../../common/upload');
const createGroupRoleMiddleware = require('../role/group-role.middleware.js');

const PerfumeController = require('./perfume.controller');
const PerfumeRequest = require('./requests');
const authMiddleware = require('../auth/auth.middleware.js');

module.exports = Router([
  {
    path: '/perfumes',
    method: 'get',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      PerfumeController.get,
    ],
  },
  {
    path: '/perfumes',
    method: 'post',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createRequestValidator(PerfumeRequest.create),
      PerfumeController.create,
    ],
  },
  {
    path: '/perfumes/:id',
    method: 'get',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      PerfumeController.find,
    ],
  },
  {
    path: '/perfumes/:id',
    method: 'patch',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createRequestValidator(PerfumeRequest.update),
      PerfumeController.update,
    ],
  },
  {
    path: '/perfumes/:id/stock',
    method: 'patch',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createRequestValidator(PerfumeRequest.updateStock),
      PerfumeController.updateStock,
    ],
  },
  {
    path: '/perfumes/:id/photo',
    method: 'patch',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      createUploadMiddleware(PerfumeRequest.uploadPhoto),
      PerfumeController.updatePhoto,
    ],
  },
  {
    path: '/perfumes/:id',
    method: 'delete',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      PerfumeController.delete,
    ],
  },
]);
