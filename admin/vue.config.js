const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pages: {
    ui: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "ui"]
    }
  },
  devServer: {
    proxy: {
      '/medical': {
        target: 'http://121.196.42.224:8080',//目标地址
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      }
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
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