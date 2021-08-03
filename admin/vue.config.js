const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/jiangbei-medical/mage/dist/' : '/',
  devServer: {
    proxy: {
      '/medical': {
        target: 'http://121.196.42.224:8880',//目标地址
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      }
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 修复HMR
    config.resolve.symlinks(true);
    // 别名设置
    config.resolve.alias
      .set("@", resolve("src"))
  },
  css: {
    extract: false,
    loaderOptions: {
      less: {

      }
    }
  }
};