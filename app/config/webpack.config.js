const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: {
    js: "./index.js",
    html: "./index.html"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?sourceMap',
          "autoprefixer?{browsers:['>1%']}",
          'sass?sourceMap'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output:{
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: '../src/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    watchContentBase: true,
    progress: true
  },
}
