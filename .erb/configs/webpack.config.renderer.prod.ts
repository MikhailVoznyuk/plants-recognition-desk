/**
 * Build config for electron renderer process
 */

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';
import deleteSourceMaps from '../scripts/delete-source-maps';

checkNodeEnv('production');
deleteSourceMaps();

const configuration: webpack.Configuration = {
  devtool: 'source-map',

  mode: 'production',

  target: ['web', 'electron-renderer'],

  entry: [path.join(webpackPaths.srcRendererPath, 'index.tsx')],

  output: {
    path: webpackPaths.distRendererPath,
    publicPath: './',
    filename: 'renderer.js',
    library: {
      type: 'umd',
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        oneOf: [
          {
            test: /\.module\.css$/i,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  esModule: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName:
                      process.env.NODE_ENV === 'production'
                        ? '[hash:base64:6]'
                        : '[path][name]__[local]',
                  },
                },
              },
            ],
          },
          {
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { esModule: false, modules: false },
              },
            ],
          },
        ],
      },
      {
        test: /\.module\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /\.module\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { esModule: false, modules: false },
          },
          'sass-loader',
        ],
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // Images
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // SVG
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          'file-loader',
        ],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },

  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      analyzerPort: 8889,
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(webpackPaths.srcRendererPath, 'index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      isBrowser: false,
      isDevelopment: false,
    }),

    new webpack.DefinePlugin({
      'process.type': '"renderer"',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '@pages': path.resolve(__dirname, '../../src/renderer/pages'),
      '@components': path.resolve(__dirname, '../../src/renderer/components'),
      '@ui': path.resolve(__dirname, '../../src/renderer/ui'),
      '@lib': path.resolve(__dirname, '../../src/renderer/lib'),
      '@types': path.resolve(__dirname, '../../src/types'),
      '@assets': path.resolve(__dirname, '../../assets'),
      '@': path.resolve(__dirname, '../../src/'),
    },
  },
};

export default merge(baseConfig, configuration);
