const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  // 忽略默认的webpack设置
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
  return config;
};