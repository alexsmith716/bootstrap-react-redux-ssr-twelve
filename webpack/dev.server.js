const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
// const config = require('../config/config');
const externals = require('./node-externals');

// const loaderUtils = require('loader-utils').stringifyRequest;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { DuplicatesPlugin } = require('inspectpack/plugin');

const rootPath = path.resolve(__dirname, '..');
const WriteFilePlugin = require('write-file-webpack-plugin');

const generatedIdent = (name, localName, lr) => {
  const r = Buffer.from(lr).toString('base64');
  return name + '__' + localName + '--' + r.substring( r.length-12, r.length-3 );
};

const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};

// ==============================================================================================

// const babelrc = fs.readFileSync('./.babelrc', 'utf8');
// let prodconfig = {};
// 
// try {
//   prodconfig = JSON.parse(babelrc);
//   console.error('>>>>>>>>> webpack prod.server > SUCCESS: parsing .babelrc !!typeof: ', typeof prodconfig)
//   console.error('>>>>>>>>> webpack prod.server > SUCCESS: parsing .babelrc !!: ', prodconfig)
// } catch (err) {
//   console.error('>>>>>>>>> webpack prod.server > ERROR: parsing .babelrc: ', err)
// }

// ==============================================================================================
// https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime

module.exports = {

  context: path.resolve(__dirname, '..'),

  name: 'server',
  target: 'node',
  externals,
  mode: 'development',
  // devtool: 'eval',  // generated code
  // devtool: false,
  devtool: 'source-map',

  entry: './src/server.js',

  output: {
    path: path.resolve('./build/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                  if (path.basename(loaderContext.resourcePath).indexOf('global.scss') !== -1) {
                    return localName;
                  } else {
                    return generatedIdent(path.basename(loaderContext.resourcePath).replace(/\.[^/.]+$/, ""), localName, loaderContext.resourcePath);
                  }
                },
                mode: 'local',
              },
              onlyLocals: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              // sourceMap: true,
              // debug: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false,
              outputStyle: 'expanded', // https://github.com/sass/node-sass#outputstyle
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                path.resolve(rootPath, 'src/theme/scss/app/functions.scss'),
                path.resolve(rootPath, 'src/theme/scss/app/variables.scss'),
                path.resolve(rootPath, 'src/theme/scss/app/mixins.scss')
              ],
            },
          },
        ]
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader : 'css-loader',
            options: {
              modules: {
                getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                  if (path.basename(loaderContext.resourcePath).indexOf('global.scss') !== -1) {
                    return localName;
                  } else {
                    return generatedIdent(path.basename(loaderContext.resourcePath).replace(/\.[^/.]+$/, ""), localName, loaderContext.resourcePath);
                  }
                },
                mode: 'local',
              },
              onlyLocals: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              // sourceMap: true,
              // debug: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
        },
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff'
        }
      }, 
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream'
        }
      }, 
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        // options: {
        //   name: '[path][name].[ext]',
        // },
      }, 
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'image/svg+xml'
        }
      },
    ]
  },

  performance: {
    hints: false
  },

  resolve: {
    // modules: [ 'client', 'node_modules' ],
    extensions: ['.json', '.js', '.jsx', '.scss'],
  },

  plugins: [
    // new WriteFilePlugin(),
    // new webpack.ProgressPlugin(handler),
    // https://webpack.js.org/plugins/module-concatenation-plugin/
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // https://webpack.js.org/plugins/internal-plugins/#occurrenceorderplugin
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // https://webpack.js.org/plugins/limit-chunk-count-plugin/
    // After compiling some chunks are too small - creating larger HTTP overhead
    // post-process chunks by merging them

    // LimitChunkCountPlugin with 'maxChunks: 1' insures only one file is generated 
    //    for server bundle so it can be run synchronously
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') },
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../../analyzers/bundleAnalyzer/dev.server.html',
      // analyzerMode: 'server',
      // analyzerPort: 8888,
      // defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: false
    }),

    new DuplicatesPlugin({
      // Emit compilation warning or error? (Default: `false`)
      emitErrors: false,
      // Handle all messages with handler function (`(report: string)`)
      // Overrides `emitErrors` output.
      emitHandler: undefined,
      // Display full duplicates information? (Default: `false`)
      verbose: true
    }),
  ]
};
