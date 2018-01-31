var WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
var merge = require('webpack-merge');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'bitstart',
  minify: {
    collapseWhitespace: true
  },
  template: './index.html'
})
const ExtractTextPluginConfig = new ExtractTextPlugin({
     filename: 'style.[hash].css'
    })

const ProvidePluginConfig = new webpack.ProvidePlugin({ $: 'jquery', })

const NODE_ENV = process.env.NODE_ENV || 'development';

const production = {
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        output: {
          comments: false,
          beautify: false,
        },
        compress: {
          warnings:     false,
          drop_console: true,
          unsafe:       true
        },
        warnings: false
      }
    }),
    new CompressionPlugin({
      test: [/\.js/,/\.css$/],
      asset: '[path].gz[query]',
      algorithm: 'gzip'
    })
  ]
}

module.exports = {
  context: __dirname + '/app',
  entry: './index.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.[hash].js',
  },

  module: {
    loaders: [
      {
          test: /\.(webm|mp4)$/,
          loader: 'file-loader'
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: [`css-hot-loader`].concat(ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              loader: "css-loader",
              query: {
                localIdentName: 'ob-[local]',
                importLoaders: 1,
              }
            },
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    require('autoprefixer'),
                  ];
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                plugins() {
                  return [
                    require('autoprefixer'),
                  ];
                },
              },
            }
          ]
        }))
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            query: {
              modules: true,
              localIdentName: 'ob-[local]',
              importLoaders: 1,
            }
          }]
        })
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,/\.(svg)$/i],
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              name: '[path][name].[ext]'
            },
          },
        ],
      }
    ]
  },

  resolve: {
    extensions: [ '.js', '.scss'],
    alias: {
      style: './app/scss/',
      img: path.resolve(__dirname, 'app/img/'),
      action: path.resolve(__dirname, 'app/action/')
    }
  },

  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, 'public'),
    port: 9000,
    stats: 'errors-only',
    historyApiFallback: {
      disableDotRule: true
    }
  },
  plugins: [
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
    }),
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
    ProvidePluginConfig,
    new WebpackBundleSizeAnalyzerPlugin(path.resolve(__dirname, './plain-report.txt'))
  ],
}

if (NODE_ENV === 'production') {
  module.exports = merge(module.exports, production)
}
