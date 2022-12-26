const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const createLocaleMiddleware = require('express-locale');

const { setup: setupI18n } = require('../lib/i18n');
const { errorMiddleware } = require('../common/error');

module.exports = function setupApp(config = {}) {
  const app = express();

  // Configuration
  app.set('port', config.port || 4000);

  // Pre Middlewares
  app.use(morgan('tiny'));
  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/uploads', express.static(config.staticPath || 'public'));
  app.use(createLocaleMiddleware());
  app.use(setupI18n(config.messages, config.defaultLocale));

  // Route
  config.routes.forEach((route) => {
    app.use(route);
  });

  // Post Middleware
  app.use(errorMiddleware({ debug: config.env === 'development' }));

  return app;
};
