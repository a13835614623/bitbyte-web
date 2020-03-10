const isProduction = process.env.NODE_ENV === 'production';
// 开发环境
let dev_url = 'http://127.0.0.1:9527';
// 目标url
let target = "http://106.13.32.222:9527";
// let target=dev_url;
// const HappyPack = require('happypack');
// const os = require('os');
// const path = require('path');
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// 压缩插件
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
// 多线程打包插件
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
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
        pathRewrite: {},
      },
    },
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
      config.plugins
        .push
        // new ParallelUglifyPlugin({
        //   uglifyJS: {
        //     output: {
        //       comments: false,
        //     },
        //     warnings: true,
        //   },
        // }),
        ();
      // config.module.rules.push({
      //   test: /\.js$/,
      //   //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
      //   loader: 'happypack/loader?id=happyBabel',
      //   include: [path.resolve('src')],
      //   //排除node_modules 目录下的文件
      //   exclude: /node_modules/
      // })
      // config.plugins.push(
      //   new HappyPack({
      //     //用id来标识 happypack处理那里类文件
      //     id: 'happyBabel',
      //     //如何处理  用法和loader 的配置一样
      //     loaders: [
      //       {
      //         loader: 'babel-loader?cacheDirectory=true',
      //       },
      //     ],
      //     //共享进程池
      //     threadPool: happyThreadPool,
      //     //允许 HappyPack 输出日志
      //     verbose: true,
      //   }),
      // );
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
        `,
      },
    },
  },
};
