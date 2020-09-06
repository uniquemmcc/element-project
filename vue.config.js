module.exports = {
  lintOnSave: false,


  devServer: {
    proxy: {
      '/api':{
        target: 'http://120.25.170.10',
        changeOrigin: true, 
        pathRewrite: {
            '^/api': '' 
        }
      }     
    }
  }
}
