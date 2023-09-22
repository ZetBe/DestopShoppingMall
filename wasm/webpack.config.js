const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const path = require('path')
module.exports = smp.wrap({
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'webpack.bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.js'],
    alias: {
      browser: path.resolve(__dirname, 'src/index.tsx'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: [/\.tsx?$/],
        loader: 'esbuild-loader',
        include: path.resolve(__dirname, './src/index.tsx'),
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2020',
        },
      },
    ],
  },
})
