module.exports = {
  'presets': [
    '@babel/env'
  ],
  'plugins': [
    [
      '@babel/plugin-proposal-decorators', {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
