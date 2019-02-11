module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
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
        target: 'http://127.0.0.1:8888/bitbyte',
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