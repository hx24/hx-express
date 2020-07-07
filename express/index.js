const http = require('http')
const url = require('url')

function createApplication() {
  // app是一个监听函数
  let app = (req, res) => {
    // 取出每一个layer
    // 1. 获取请求的方法
    let req_method = req.method.toLowerCase() // /user?a=1
    let { pathname } = url.parse(req.url)

    // 通过next方法进行迭代
    let index = 0
    function next() {
      if (index === app.routes.length) {
        // 数组全部迭代完成，还没有找到，说明路径不存在
        return res.end(`Cannot ${req_method} ${pathname}`)
      }
      const { method, path, handler } = app.routes[index++]
      // 每次调用，next就应该取下一个layer
      if (method === 'middle') {
        // 处理中间件
        if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
          handler(req, res, next)
        } else {
          next() // 如果这个中间件没有匹配到，那么继续匹配下一个layer
        }
      } else {
        // 处理路由, 当前layer未匹配时自动找下一个
        if ((req_method === method || method === 'all') && (path === pathname || path === '*')) {
          handler(req, res)
        } else {
          next()
        }
      }
    }

    next()

    // for (let i = 0; i < app.routes.length; i++) {
    //   const { method, path, handler } = app.routes[i]
    //   if ((req_method === method || method === 'all') && (path === pathname || path === '*')) {
    //     handler(req, res)
    //   }
    // }
    // res.end(`Cannot ${req_method} ${pathname}`)
  }

  app.routes = []

  // 处理中间件
  app.use = function (path, handler) {
    if (typeof handler !== 'function') {
      handler = path
      path = '/'
    }
    let layer = {
      method: 'middle',
      handler,
      path,
    }
    app.routes.push(layer)
  }

  app.all = function (path, handler) {
    let layer = {
      method: 'all',
      path,
      handler,
    }
    app.routes.push(layer)
  }
  http.METHODS.forEach((method) => {
    method = method.toLowerCase()
    app[method] = function (path, handler) {
      let layer = {
        method,
        path,
        handler,
      }
      app.routes.push(layer)
    }
  })

  app.listen = function () {
    let server = http.createServer(app)
    server.listen(...arguments)
  }

  return app
}
module.exports = createApplication
