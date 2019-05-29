const Golc = require('golc')
const L = new Golc('Build | Webpack')

function runBundler(bundler) {
  return new Promise((res) =>  {
    bundler.run((err, stats) => {
      if (err) {
        L.error(err)
      }
      L.log(stats.toString({colors: true}))

      const statsErrors = stats.toJson({errorDetails: false}).errors

      if (statsErrors && statsErrors.length) {
        L.error(statsErrors[0])
      }

      res()
    })
  })
}

module.exports = runBundler
