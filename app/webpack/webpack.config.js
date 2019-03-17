const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: {
    app: './index.js',
    html: './index.html',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                autoprefixer({
                  browsers: ['>1%', 'last 2 versions'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      constants: path.resolve(__dirname, '../src/constants'),
      containers: path.resolve(__dirname, '../src/containers'),
      images: path.resolve(__dirname, '../src/assets/images'),
      store: path.resolve(__dirname, '../src/store'),
      styles: path.resolve(__dirname, '../src/assets/styles'),
      utils: path.resolve(__dirname, '../src/utils'),
    },
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new HtmlWebPackPlugin({
      template: 'index.html',
      filename: 'index.html',
      favicon: 'assets/images/favicon.ico',
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    chunkFilename: '[id].[chunkhash].js',
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 3000,
    watchContentBase: true,
    progress: true,
  },
}
