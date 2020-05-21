module.exports = {
  outputDir: 'dist',
  publicPath: '',
  assetsDir: '',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
      }
    }
  },
  devServer: {
    port: 8000, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      '/Baidu':{
        target:'https://apielf.xiangha.com/',
        changeOrigin:true,
        pathRewrite:{
          '^/Baidu':'/Baidu'
        }
      },
      '/common':{
        target:'https://apielf.xiangha.com/',
        changeOrigin:true,
      },
    }
  },
}