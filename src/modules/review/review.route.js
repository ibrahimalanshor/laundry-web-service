const { Router } = require('../../common/router');
const { createRequestValidator } = require('../../common/request-validator');
const createGroupRoleMiddleware = require('../role/group-role.middleware.js');

const ReviewController = require('./review.controller');
const ReviewRequest = require('./requests');
const authMiddleware = require('../auth/auth.middleware.js');

module.exports = Router([
  {
    path: '/reviews',
    method: 'get',
    handler: [authMiddleware, ReviewController.get],
  },
  {
    path: '/reviews',
    method: 'post',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('user'),
      createRequestValidator(ReviewRequest.create),
      ReviewController.create,
    ],
  },
  {
    path: '/reviews/:id',
    method: 'get',
    handler: [authMiddleware, ReviewController.find],
  },
  {
    path: '/reviews/:id',
    method: 'delete',
    handler: [
      authMiddleware,
      createGroupRoleMiddleware('admin'),
      ReviewController.delete,
    ],
  },
]);
