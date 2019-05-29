const options = {
  production: process.env.NODE_ENV === 'production',
  buildHash: `buildhash:${Date.now()}`
}

module.exports = options
