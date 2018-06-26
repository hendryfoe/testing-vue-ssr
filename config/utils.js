const path = require('path');

module.exports = {
  relativePath(...paths) {
    return path.resolve.call(null, __dirname, ...paths);
  }
};
