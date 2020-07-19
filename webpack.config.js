/* Webpack configuration */

import dotenv from 'dotenv'
import { resolve, basename } from 'path'
import { readFileSync } from 'fs'
import { sync } from 'glob'

import webpack from 'webpack'
import DotenvWebpack from 'dotenv-webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ImageminWebpackPlugin from 'imagemin-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import PurgecssWebpackPlugin from 'purgecss-webpack-plugin'
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import SitemapWebpackPlugin from 'sitemap-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

// Configuration
import pkg from './package'
import _ from './app.config'
dotenv.config()

// Helpers
const resolvePath = (...args) => resolve(__dirname, ...args)
const allHtml = sync(resolvePath('src', '[^_]*.hbs'))
const siteMap = JSON.parse(readFileSync(resolvePath('src', 'sitemap.json'), 'utf8'))

const webpackConfig = (env = {}, argv) => {
  // Set `development` as Webpack default mode
  argv.mode = argv.mode || 'development'
  // Set `production` mode using `--mode=production`
  const PRODUCTION = argv.mode === 'production'
  // Enable debug mode using `--debug`
  const DEBUG = argv.debug || false
  // Enable gzip compression using `--gzip`
  const GZIP = argv.gzip || false
  // Environment specific file suffix
  const SUFFIX = PRODUCTION ? `${pkg.version}.min` : 'dev'

  // Local development server configuration
  const devServer = {
    // clientLogLevel: DEBUG ? 'debug' : 'silent',
    stats: DEBUG ? 'verbose' : 'minimal',
    // turn off all error logging
    // required by `friendly-errors-webpack-plugin`
    // quiet: true,

    contentBase: [resolvePath('dist')],
    watchContentBase: true,
    writeToDisk: true,
    host: 'localhost',
    port: process.env.APP_PORT,
    // public: process.env.APP_URL,
    // publicPath: '/',
    allowedHosts: [],
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8081',
    //     changeOrigin: true
    //   }
    // },

    inline: true,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: {
      index: '/404.html'
    },
    // openPage: ['index.html'],
    open: true
  }

  if (process.env.APP_URL !== '') {
    devServer.public = process.env.APP_URL
  } else {
    process.env.APP_URL = `http://localhost:${process.env.APP_PORT}`
  }

  if (process.env.APP_API_URL !== '') {
    devServer.allowedHosts.push(process.env.APP_API_URL)
  } else {
    process.env.APP_API_URL = `http://localhost:${process.env.APP_API_PORT}`
  }

  return ({
    devServer,

    context: resolvePath('src'),
    entry: _.config.entry,

    output: {
      path: resolvePath('dist'),
      publicPath: '/',
      // chunkFilename: 'js/[name].[id].js',
      filename: `js/[name].${SUFFIX}.js`
    },

    // Style of source mapping to enhance the debugging process
    devtool: PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',

    // How webpack notifies you of assets and entrypoints
    // that exceed a specific file limit
    performance: {
      hints: false
    },

    // Make watching work properly
    watchOptions: {
      poll: true
    },

    // Options for resolving module requests
    resolve: {
      extensions: ['.js', '.css', '.scss', '.hbs'],
      modules: ['node_modules']
      // alias: {}
    },

    // Options affecting the normal modules
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          // exclude: /node_modules/,
          include: resolvePath('src', 'js'),
          loader: 'eslint-loader',
          options: {
            // eslintPath: '', // `.eslintrc` is used by default
            emitError: true,
            emitWarning: !PRODUCTION,
            failOnError: PRODUCTION
          }
        },
        {
          test: /\.js$/,
          // exclude: /node_modules/,
          include: resolvePath('src', 'js'),
          loader: 'babel-loader',
          options: {
            // cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
          }
        },
        {
          test: /\.s[ac]ss$/i,
          // exclude: /node_modules/,
          include: resolvePath('src', 'scss'),
          use: [
            PRODUCTION || DEBUG ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: (loader) => [
                  require('postcss-preset-env')()
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          include: [
            resolvePath('src', 'img')
          ],
          loader: 'file-loader',
          options: {
            // Required for handlebars-loader to replace
            // inline require statements. For images
            esModule: false,
            name: '[name].[ext]',
            outputPath: 'img/'
          }
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg)$/,
          include: [
            /@fortawesome/,
            resolvePath('src', 'font')
          ],
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'font/'
          }
        },
        {
          test: /\.hbs$/,
          include: resolvePath('src'),
          loader: 'handlebars-loader',
          options: {
            helperDirs: [resolvePath('src', '_helpers')],
            partialDirs: [resolvePath('src', '_partials')],
            inlineRequires: '/img/'
          }
        }
      ]
    },

    // Add plugins to the compiler
    plugins: [
      // Remove output folder(s) before building
      new CleanWebpackPlugin({
        verbose: DEBUG
      }),

      // Supports dotenv and other environment variables
      // and only exposes what you choose and use
      new DotenvWebpack({
        safe: true,
        systemvars: true,
        silent: DEBUG
      }),

      // Create global constants which can be configured at compile time
      new webpack.DefinePlugin({
        'process.env': {
          PRODUCTION: JSON.stringify(PRODUCTION),
          DEBUG: JSON.stringify(DEBUG)
        }
      }),

      // Lint all CSS files with `stylelint`
      new StylelintWebpackPlugin({
        context: resolvePath('src', 'scss'),
        files: ['**/*.scss'],
        emitError: true,
        failOnError: PRODUCTION
      }),

      // Move CSS into a separate output file
      new MiniCssExtractPlugin({
        filename: `css/[name].${SUFFIX}.css`
      }),

      // Copies individual files or entire directories
      new CopyWebpackPlugin({
        patterns: [{
          context: resolvePath('public'),
          from: '*.@(txt|xml|svg|jpg|jpeg|gif)',
          to: resolvePath('dist')
        }]
      }),

      // Generate HTML file(s)
      ...generateViews(allHtml, {
        inject: false,
        minify: PRODUCTION ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
          minifyJS: true
        } : false,
        // Pass config and env variables
        _: {
          ..._,
          env: {
            PRODUCTION,
            DEBUG,
            ...process.env
          }
        }
      }, PRODUCTION),

      // Optimize all images for production env only
      new ImageminWebpackPlugin({
        disable: !PRODUCTION,
        test: /\.(png|jpe?g|gif|svg)$/i,
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        optipng: {
          interlaced: false,
          optimizationLevel: 5
        },
        jpegtran: {
          progressive: true
        },
        gifsicle: {
          interlaced: true,
          optimizationLevel: 2
        }
      }),

      // Generate all favicons from the `public/favicon.svg`
      new FaviconsWebpackPlugin({
        logo: resolvePath('public', 'favicon.svg'),
        prefix: '/',
        // devMode: 'webapp',
        // inject: true,
        favicons: {
          lang: _.app.lang,
          ..._.config.favicons
        }
      }),

      // Generates sitemap.xml
      PRODUCTION
        ? new SitemapWebpackPlugin(process.env.APP_URL, siteMap, {
          lastmod: true,
          changefreq: 'monthly',
          priority: '0.4',
          skipgzip: !GZIP
        })
        : 0,

      // Add dynamic banner to output bundle(s)
      PRODUCTION
        ? new webpack.BannerPlugin([
          new Date().toISOString().substr(0, 10),
          pkg.name,
          `@version ${pkg.version}`,
          `@license ${pkg.license}`,
          `@author  ${pkg.author}`,
          'Copyright (c) 2020'
        ].join('\n'))
        : 0,

      // Remove unused CSS with PurgeCSS
      PRODUCTION
        ? new PurgecssWebpackPlugin({
          paths: sync(`${resolvePath('src')}/**/*`, {
            nodir: true
          })
        })
        : 0,

      // Prepare compressed versions of assets to serve them with Content-Encoding
      GZIP
        ? new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/,
          filename: '[path].gz[query]',
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
        : 0

    ].filter(Boolean),

    // Optimizations depending on the chosen mode
    optimization: {
      minimize: PRODUCTION,
      minimizer: [
        // JavaScript parser, mangler and compressor toolkit for ES6+
        new TerserWebpackPlugin({
          sourceMap: true,
          extractComments: false,
          terserOptions: {
            sourceMap: true,
            warnings: true,
            ecma: 5,
            mangle: false
          }
        }),

        // Plugin to optimize\minimize CSS assets using cssnano
        new OptimizeCssAssetsWebpackPlugin({
          sourceMap: true,
          cssProcessorOptions: {
            map: {
              inline: false
            },
            autoprefixer: false
          }
        })
      ],

      // Create a `vendors` chunk, which includes all code
      // shared between entrypoints from `node_modules`
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            minChunks: 2
          }
        }
      }
    }
  })
}

/**
 * generateViews
 *
 * @param items {Array} List of paths to the `.hbs` files
 * @param options {Object} html-webpack-plugin options
 * @returns {Array} New instances of HtmlWebpackPlugin
 */
function generateViews (items, options) {
  const views = []

  items.map(item => {
    const fileName = basename(item, '.hbs')

    views.push(
      new HtmlWebpackPlugin({
        template: resolvePath('src', `${fileName}.hbs`),
        filename: `${fileName}.html`,
        ...options
      })
    )
  })

  return views
}

module.exports = webpackConfig
