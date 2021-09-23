'use strict'

require('raygun-apm/http') // visual perfomance profiler or we can use nodejs profiler
const app = require('express')()
const images = require('./src/images.json')
const ExpressRedisCache = require('express-redis-cache')
const cache = ExpressRedisCache() // need to install redis

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

app.get('/images', cache.route(), ({ query }, res) => {
  console.log(cache.query)
  const limitNum = parseInt(query.limit)
  const pageNum = parseInt(query.page)

  const start = pageNum * limitNum
  const end = start + limitNum

  const maxPages = images.length / limitNum

  const i = query.limit ? images.slice(start, end) : images

  setTimeout(() => {
    return res.status(200).json({ i, maxPages })
  }, randomInterval(500, 1500))
})

app.listen(5000, () => {
  process.stdout.write('Server is available on http://localhost:5000/\n')
})
