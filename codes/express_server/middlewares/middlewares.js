const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

function createExpressApp() {

   const app = express()
   app.use('/assets', express.static(path.join(process.env.ROOTDIR, '/public')))
   app.use(bodyParser.urlencoded({ extended: true }))
   app.use(bodyParser.json())
   app.use('/', (req, res, next) => {
      console.log('Incoming request for: ' + req.url)
      next()
   })

   //set view engine and path to views folder
   app.set('view engine', 'ejs')
   app.set('views', path.join(process.env.ROOTDIR, '/views'))

   return app
   
}

module.exports = {
   createExpressApp
}