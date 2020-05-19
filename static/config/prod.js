export const env = {
  NODE_ENV: '"production"',
  outputRoot: '../var/static',
};
export const defineConstants = {};
export const mini = {};
export const h5 = {
  /**
   * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
   * 参考代码如下：
   * webpackChain (chain) {
   *   chain.plugin('analyzer')
   *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
   * }
   */
};
