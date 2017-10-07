const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const dev = process.env.NODE_ENV === 'dev'
const port = process.env.PORT || 8080

// Output visual indicator of ENV
if (dev) {
  console.log(chalk.bgYellow(' ') + chalk.bgBlue(' Webpack '))
} else {
  console.log(chalk.bgGreen(' ') + chalk.bgBlue(' Webpack '))
}

module.exports = {
  devtool: dev ? 'inline-source-map' : '',
  entry: {
    main: __dirname + '/src'
  },
  output: {
    path: __dirname + '/app',
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['src', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        // Sass indented syntax
        test: /\.sass$/,
        loaders: [
          'style-loader',
          'css-loader?url=false',
          'sass-loader?outputStyle=expanded&indentedSyntax'
        ]
      }
    ]
  },
  plugins: dev ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [],
  devServer: {
    hot: true,
    contentBase: __dirname + '/app',
    // overlay: {warnings: true, errors: true}
  },
  target: 'electron'
}
