const isProduction = process.env.NODE_ENV === 'production'

// 开发环境
let dev_url = 'http://127.0.0.1:8080';
// 生产环境
let prod_url = 'http://127.0.0.1:80';
// 目标url
let target = isProduction ? prod_url : dev_url;
// 压缩插件
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
// 多线程打包插件
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
module.exports = {
  outputDir: 'dist',
  indexPath: 'index.html',
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 不使用sourceMap
  productionSourceMap: false,
  //axios域代理，解决axios跨域问题
  devServer: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {

        }
      }
    }
  },
  // webpack配置
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (isProduction) {
      // 启用gzip压缩
      // config.plugins.push(new CompressionWebpackPlugin({
      //   filename: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //   threshold: 2048,
      //   minRatio: 0.8
      // }))
      // 
      config.plugins.push(new ParallelUglifyPlugin({
        uglifyJS: {
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }
      }))
    } else {
      // 为开发环境修改配置...
    }
  },
  // 全局引入scss
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/index.scss";
        `
      }
    }
  }
}