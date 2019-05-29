const options = require('../config/options')
const paths = require('../config/paths')

const bs = require('browser-sync').create(options.buildHash)

const webpackConfig = require('../config/webpack.config')
const scriptsBundler = require('./utils/webpack-bundlers').scripts

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

process.on('exit', () => {
  bs.exit()
})

module.exports = function browserSync(done) {
  bs.init({
    server: {
      baseDir: paths.dist.public,
      routes: {
        '/assets': './assets'
      },
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    port: 3000,
    open: false,
    middleware: [
      webpackDevMiddleware(scriptsBundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
      }),
      webpackHotMiddleware(scriptsBundler)
    ]
  }, done)
}
