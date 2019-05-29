const options = require('../config/options')

module.exports = function reloadBrowserSync(done) {
  const bs = require('browser-sync').get(options.buildHash)
  bs.reload()
  done()
}
