const uuid = require('uuid/v4')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.static('node_modules'))
app.use(express.static('dist'))
app.use(cookieParser())

app.set('view engine', 'pug')

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

console.log(`start listening on port ${process.env.PORT}`)
app.listen(process.env.PORT)
