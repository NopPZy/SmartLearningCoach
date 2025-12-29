module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@context': './src/context',
            '@api': './src/api',
            '@styles': './src/styles',
            '@assets': './src/assets',
          },
        },
      ],
      ['@babel/plugin-transform-private-methods', { loose: true }],
    ],
  };
};