const http = require('http')
const url = require('url')

function createApplication() {
  // app是一个监听函数
  let app = (req, res) => {
    // 取出每一个layer
    // 1. 获取请求的方法
    let req_method = req.method.toLowerCase() // /user?a=1

    let { pathname } = url.parse(req.url)
    for (let i = 0; i < app.routes.length; i++) {
      const { method, path, handler } = app.routes[i]
      if (req_method === method && path === pathname) {
        handler(req, res)
      }
    }
    res.end(`Cannot ${req_method} ${pathname}`)
  }

  app.routes = []

  app.get = function (path, handler) {
    let layer = {
      method: 'get',
      path,
      handler,
    }
    app.routes.push(layer)
  }

  app.listen = function () {
    let server = http.createServer(app)
    server.listen(...arguments)
  }

  return app
}
module.exports = createApplication
