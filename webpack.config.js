let idx = process.argv.findIndex((v) => v === '--env');
const ENV = idx >= 0 ? process.argv[idx + 1] : 'DEV';

if (ENV === 'PROD') {
  process.env.NODE_ENV = 'production';
}

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    devtoolLineToLine: ENV !== 'PROD',
    path: `${__dirname}/public`
  },
  devServer: {
    inline: true,
    progress: true,
    colors: true,
    contentBase: './public'
  },
  externals: {
    // Use external version of React
    // react: "React",
    // "react-dom": "ReactDOM"
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
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
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

module.exports = config;
