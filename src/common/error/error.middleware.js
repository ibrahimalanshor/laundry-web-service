const { HttpException } = require('../exceptions');

module.exports = function (config = {}) {
  return (err, req, res, next) => {
    if (err instanceof HttpException) {
      return res.status(err.status).json({
        status: err.status,
        name: req.polyglot.t(`http.${err.status}`),
        message: req.polyglot.t(err.message ?? `http.${err.status}`),
        errors: err.errors,
      });
    }

    if (config.debug) {
      console.log(err);
    }

    return res.status(500).json({
      status: 500,
      name: req.polyglot.t('http.500'),
    });
  };
};
