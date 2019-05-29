const appPath = '.'
const distPath = `${appPath}/dist`
const publicPath = `${distPath}/public`

module.exports = {
  root: appPath,
  src: {
    root: appPath,
    styles: `${appPath}/styles`,
    scripts: `${appPath}/scripts`,
    assets: `${appPath}/assets`,
    views: `${appPath}/views`,
  },

  dist: {
    public: publicPath,
    styles: `${publicPath}/css`,
    scripts: `${publicPath}/js`,
    static: `${publicPath}/static`,
    assets: `${appPath}/assets`
  }
}
