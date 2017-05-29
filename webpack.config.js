const webpack = require('webpack');

module.exports = ({ production } = false) => {
  const config = {
    entry: ['whatwg-fetch', 'babel-polyfill', './src/index.js'],
    bail: true,
    devtool: 'eval-source-map',
    output: {
      filename: 'bundle.js',
      publicPath: '',
      path: `${__dirname}/public`
    },
    devServer: {
      inline: true,
      contentBase: './public'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
            { loader: 'eslint-loader' }
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
          ]
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                // modules: true,
                // localIdentName: '[folder]_[hash:base64:5]'
              }
            },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' }
          ]
        },
        {
          test: /\.(png|gif|jpe?g)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1000000
              }
            }
          ]
        }
      ]
    }
  };
  
  if (production) {
    console.log('Webpack: Building for Production\n');
    
    config.devtool = 'source-map';
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
          comparisons: false
        },
        output: {
          comments: false
        }
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ];
  }
  
  return config;
};
