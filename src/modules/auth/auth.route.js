const { Router } = require('../../common/router');
const { createRequestValidator } = require('../../common/request-validator');

const authMiddleware = require('./auth.middleware.js');
const AuthController = require('./auth.controller');
const AuthRequest = require('./requests');

module.exports = Router([
  {
    path: '/auth/register',
    method: 'post',
    handler: [
      createRequestValidator(AuthRequest.register),
      AuthController.register,
    ],
  },
  {
    path: '/auth/login',
    method: 'post',
    handler: [createRequestValidator(AuthRequest.login), AuthController.login],
  },
  {
    path: '/auth/refresh-token',
    method: 'post',
    handler: [
      createRequestValidator(AuthRequest.refreshToken),
      AuthController.refreshToken,
    ],
  },
  {
    path: '/auth/update-profile',
    method: 'post',
    handler: [
      authMiddleware,
      createRequestValidator(AuthRequest.updateProfile),
      AuthController.updateProfile,
    ],
  },
  {
    path: '/auth/update-password',
    method: 'post',
    handler: [
      authMiddleware,
      createRequestValidator(AuthRequest.updatePassword),
      AuthController.updatePassword,
    ],
  },
  {
    path: '/auth/logout',
    method: 'post',
    handler: [authMiddleware, AuthController.logout],
  },
]);
