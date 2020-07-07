// const express = require('express')
const express = require('./express')

const app = express()

app.get('/a', (req, res) => {
  res.end('aaa')
})

app.get('/b', (req, res) => {
  res.end('bbb')
})

app.post('/b', (req, res) => {
  res.end('bbb')
})

// all表示匹配所有的方式，*表示匹配所有的路径
app.all('*', (req, res) => {
  res.end(req.method + 'user')
})

app.listen(3000, () => {
  console.log('listen on 3000')
})
