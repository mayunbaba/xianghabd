module.exports = {
  outputDir: 'dist',
  publicPath: '',
  assetsDir: '',
  devServer: {
    port: 8000, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: false,   //changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,如果设置成true：发送请求头中host会设置成target
        pathRewrite: {
          '^/api': '/api'   //  '^/api': '/main'替换成main
        }
      }
    }
  },
}