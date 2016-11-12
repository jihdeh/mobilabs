// app.js
require("babel-register");
require("babel-polyfill");
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};

require("./app-server.js");
