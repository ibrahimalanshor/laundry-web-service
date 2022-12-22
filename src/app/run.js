module.exports = function runApp(app, cb = null) {
  const port = app.get('port');

  app.listen(port, () => {
    cb ? cb(port) : console.log(`server running at ${port}`);
  });
};
