// const express = require('express')
const express = require('./express')

const app = express()

app.get('/a', (req, res) => {
  res.end('aaa')
})

app.get('/b', (req, res) => {
  res.end('bbb')
})

app.listen(3000, () => {
  console.log('listen on 3000')
})
