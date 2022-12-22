const { setup, run } = require('./src/app');
const { connect } = require('./src/lib/database');
const config = require('./config');
const routes = require('./src/modules/routes');

const app = setup({
  messages: require('./resources/messages'),
  port: config.app.port,
  defaultLocale: config.app.locale,
  env: config.env,
  routes,
});

async function start() {
  try {
    await connect(config.db.url);

    run(app);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
}

start();
