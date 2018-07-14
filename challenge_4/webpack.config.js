const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['react']
            }
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
    ]
}

};