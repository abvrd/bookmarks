var path = require('path');
var webpack = require('webpack');

var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'dist');

var config = {
  entry: [
    path.join(srcPath, 'index.js')
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [
          srcPath
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /.*\.(png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.(jpg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.(woff|ttf)$/,
        loader: 'url?limit=100000'
      }
    ]
  },
  watch: true,
  colors: true,
  progress: true
};

module.exports = config;
