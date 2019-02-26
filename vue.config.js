// 开发环境
let dev_url = 'http://127.0.0.1:8180';
// 生产环境
let prod_url = 'http://127.0.0.1:80';
// 目标url
let target = process.env.NODE_ENV=='development'?dev_url:prod_url;
module.exports = {
  // publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
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
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
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