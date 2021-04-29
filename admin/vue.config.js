const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pages: {
    ui: {
      // page 的入口
      entry: "src/views/main/main.js",
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
    },
    hh: {
      // page 的入口
      entry: "src/views/login/main.js",
      // 模板来源
      template: "public/login.html",
      // 在 dist/index.html 的输出
      filename: "login.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Login",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "hh"]
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    config.resolve.alias
      .set("@", resolve("src/views/main"))
      .set("~", resolve("src"))
  },
  css: {
    extract: false,
    loaderOptions: {
      less: {

      }
    }
  }
};