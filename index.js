const uuid = require('uuid/v4')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const config = require('./package.json').config

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cookieParser())
app.use(express.static('node_modules'))
app.use(express.static('dist'))
app.set('view engine', 'pug')
app.locals.pretty = true

app.get('/', (req, res) => {
  const userId = req.cookies['scs-commerce-uid'] || uuid()
  res.cookie('scs-commerce-uid', userId).status(200).render('index', { userId })
})

app.use((req, res, next) =>
  res.status(404).render('404'))

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).render('500', { error })
})

const port = process.env.PORT || config.port
console.log(`start listening on port ${port}`)
app.listen(port)
