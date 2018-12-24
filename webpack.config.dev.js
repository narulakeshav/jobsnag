const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CONFIG = {
  context: __dirname,
  entry: {
    bundle: path.resolve(__dirname, 'src/index.tsx'),
    background: path.resolve(__dirname, 'src/utils/background.ts'),
    contentScript: path.resolve(__dirname, 'src/utils/cs.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  target: 'web',
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        ignore: ['.DS_Store'],
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
  ],
};

if (process.env.NODE_ENV === 'production') {
  CONFIG.context = path.resolve(__dirname, 'src/index.tsx');
  CONFIG.devtool = 'false';
}

module.exports = CONFIG;
