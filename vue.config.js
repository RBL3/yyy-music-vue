const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// webpack 待提高 东拼西凑的 并未取得实质性的优化 @_@!

// const webpack = require('webpack')
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin') 

function resolve(dir) {
    return path.join(__dirname, dir)
}
const isProd = process.env.NODE_ENV === 'production'

const cdn = {
  js: [
    // 'https://cdn.jsdelivr.net/npm/vue-aplayer@1.6.1/dist/vue-aplayer.min.js',
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/muse-ui@3.0.2/dist/muse-ui.js',
    'https://cdn.jsdelivr.net/npm/vue-class-component@7.2.3/dist/vue-class-component.min.js',
    'https://cdn.jsdelivr.net/npm/@vue/composition-api@1.0.0-rc.7/dist/vue-composition-api.prod.js',
    'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js'
  ],
}

const externals = {
  'Vue': 'Vue',
  'vuex': 'Vuex', 
  'vue-router': 'VueRouter', 
  'axios': 'axios',
  'muse-ui': 'MUSEUI',
  // '@moefe/vue-aplayer': 'VueAPlayer',
  '@vue/composition-api': 'VueCompositionAPI',
  'vue-class-component': 'VueClassComponent'
}

module.exports = {
  publicPath: isProd ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 54188,
    proxy: {
      '/api': {
          target: 'http://huangjiangjun.top:9000',
          changeOrigin: true,
          pathRewrite: {
                '^/api': ''
          }
      }
  },
  },
  // 关闭生产环境的 source map
  productionSourceMap: false,
  configureWebpack: () => {
    const commom = {
      resolve: {
        alias: {
          '@': resolve('src')
        }
      },
      externals: isProd ? externals : {},
    }
    // config.plugins.push(new webpack.DllReferencePlugin({ 
    //   context: process.cwd(), 
    //   manifest: require('./public/vendor/vendor-manifest.json') 
    // }), new AddAssetHtmlPlugin({ 
    //   // dll文件位置 
    //   filepath: path.resolve(__dirname, './public/vendor/*.js'), 
    //    // dll 引用路径 
    //   publicPath: './vendor', 
    //   // dll最终输出的目录 
    //   outputPath: './vendor'
    // }))
    return {
      ...commom
    }
  },
  chainWebpack(config) {
      config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.plugin('extract-css')
      .use(new MiniCssExtractPlugin({
        filename: 'assets/[name].[hash:8].css',
        chunkFilename: 'assets/[name].[hash:8].css'
      }))
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete('prefetch')
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload');

    // gzip 压缩
    if (isProd) {
      config.plugin('compressionPlugin')
      .use(new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        minRatio: 0.8, // 压缩比
        deleteOriginalAssets: false, // 不删除源文件
      }));
    }

    config.optimization.minimize(true);
    // 分包
    config.optimization.splitChunks({
      chunks: 'all',  // all async initial     选择对哪些块进行优化
      minSize: 30000,  // 被拆分的最小大小（压缩前）
      minChunks: 1,  // 被共享的最小次数
      maxAsyncRequests: 5,  // 最大按需求并行请次数
      maxInitialRequests: 3,  // 最大初始化并行请求数
      automaticNameDelimiter: '~',  // 自动命名分隔符
      name: true, // 自动为块命名
      cacheGroups: {
    //       vendor: { // key 为entry中定义的 入口名称
    //           chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
    //           test: /vue|vue-router|vuex|axios|muse-ui|@vue\/composition-api|@moefe\/vue-aplayer/, // 正则规则验证，如果符合就提取 chunk
    //           name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
    //           minSize: 0,
    //           minChunks: 1,
    //           enforce: true,
    //           maxAsyncRequests: 1, // 最大异步请求数， 默认1
    //           maxInitialRequests : 1, // 最大初始化请求书，默认1
    //           reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
    //       },
          default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
          }
      }
    })
    config.optimization.runtimeChunk('single')
  },
}