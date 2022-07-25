/**
 * @author YangLing
 * @date 2021/12/10 9:05 AM
 */
module.exports = {
  publicPath: "./",
  devServer: {
    port: 9999,
    host: "localhost",
    https: false,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "http://upload.9yuecloud.com:8887",
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
  lintOnSave: false,
};
