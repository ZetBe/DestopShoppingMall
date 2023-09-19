const smp = new SpeedMeasurePlugin()
const cracoEsbuildPlugin = require('craco-esbuild')
const rewireSvgReactLoader = require('react-app-rewire-svg-react-loader')

module.exports = {
  plugins: [{ plugin: cracoEsbuildPlugin }],
  webpack: smp.wrap({
    configure: (webpackConfig, { paths }) => {
      // SvgReactLoader
      webpackConfig = rewireSvgReactLoader(webpackConfig, { paths })

      // @svgr
      webpackConfig.module.rules.unshift({
        test: /\.(svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@svgr/webpack',
            options: { esModule: false },
          },
        ],
      })

      return webpackConfig
    },
  }),
}
