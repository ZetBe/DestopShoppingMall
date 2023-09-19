const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  module: {
    rules: [
      // Use esbuild to compile JavaScript & TypeScript
      {
        // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          // JavaScript version to compile to
          target: 'es2015',
        },
      },

      // Other rules...
    ],
  },
  plugins: [new BundleAnalyzerPlugin()],
}
