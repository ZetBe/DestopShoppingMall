const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: [/\.tsx?$/],
        loader: 'esbuild-loader',
        include: path.resolve(__dirname, '../src'),
        options: {
          loader: 'tsx',
          target: 'es2020',
        },
      },
    ],
  },
}
