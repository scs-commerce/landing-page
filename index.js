const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))

app.set('view engine', 'pug')

app.use((req, res, next) =>
  res.status(404).render('404'))

app.use((error, req, res, next) =>
  res.status(500).render('500', { error }))

console.log(`start listening on port ${process.env.PORT}`)
app.listen(process.env.PORT)
