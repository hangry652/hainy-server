const ip = require('ip');

const onServerStarted = (PORT) => {
  console.log('\x1Bc\x1b[1mHAINY:\x1b[0m \x1b[32mServer has been started on\x1b[0m\n');
  console.log(`  Local   > \x1b[34mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`  Network > \x1b[34mhttp://${ip.address()}:${PORT}\n\x1b[0m`);
};

const log = (message) => {
  console.log(
    "\u001b[47m\u001b[30m LOG \x1b[0m " + message
  );
};

const error = (message) => {
  console.log(
    '\u001b[41m ERROR \x1b[0m ' + message
  );
};

module.exports = {
  onServerStarted,
  log,
  error
};