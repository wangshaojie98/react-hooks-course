const { override, addDecoratorsLegacy, disableEsLint } = require('customize-cra');

module.exports = override(
 addDecoratorsLegacy(),
 // disable eslint in webpack
 disableEsLint()
 );