const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch: true,
    entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      chunks: ['index'], // Specify which entry point's JavaScript to include
      filename: 'index.html', // Output file name for the HTML page
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/SAT.html'),
      chunks: ['index'], // Specify which entry point's JavaScript to include
      filename: 'SAT.html', // Output file name for the HTML page
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/references.html'),
      chunks: ['index'], // Specify which entry point's JavaScript to include
      filename: 'references.html', // Output file name for the HTML page
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/contact.html'),
      chunks: ['index'], // Specify which entry point's JavaScript to include
      filename: 'contact.html', // Output file name for the HTML page
    }),
  ],
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(png|jpg)$/i, 
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext][query]'
        }
      },

      {
        test: /\.csv$/, 
        use: 'file-loader'
        // type: 'asset/resource',
        // generator: {
        //   filename: 'assets/[name][ext][query]'
        // }
      },

    ],
  },
};