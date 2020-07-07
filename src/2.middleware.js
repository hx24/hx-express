// const express = require('express')
const express = require('../express')
const app = express()

// 中间件路径默认是'/'
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  next()
})

// 中间件use与路由匹配不同，不是完全匹配，startsWith匹配即可
app.use('/name', function (req, res, next) {
  console.log('name')
  next()
})

app.get('/name', (req, res) => {
  // 不设置header指定charset，中文会乱码
  // res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  res.end('中文')
})

app.get('/name/n', (req, res) => {
  res.end('姓名')
})

app.get('/age', (req, res) => {
  res.end('年龄9岁')
})

app.listen(3000, () => {
  console.log('listen on 3000')
})
