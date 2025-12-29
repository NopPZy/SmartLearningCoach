const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Fix for CommonJS modules using 'exports'
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "exports": false,
    "buffer": require.resolve("buffer/"),
    "process": require.resolve("process/browser"),
  };

  // Set global object to 'this' to allow CommonJS globals
  config.output.globalObject = 'this';

  // Treat @react-navigation modules as CommonJS
  config.module.rules.push({
    test: /\.js$/,
    include: /node_modules\/@react-navigation/,
    type: 'javascript/auto',
  });

  return config;
};