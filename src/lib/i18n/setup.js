const Polyglot = require('node-polyglot');

module.exports = function i18nMiddleware(messages, defaultLocale = 'en') {
  return (req, res, next) => {
    const polyglot = new Polyglot();

    if (messages) {
      polyglot.extend(messages[req.locale.language] ?? messages[defaultLocale]);
    }

    req.polyglot = polyglot;

    next();
  };
};
