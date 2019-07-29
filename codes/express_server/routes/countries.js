const express = require('express')

const router = express.Router()

// Mock data
let countries = ['USA', 'CANADA', 'MEXICO']

/** GET All countries */
router.get('/', (req, res, next) => {
   res.render('countrieslist', { countries })
})

/** POST country with x-www-form-urlencoded */
router.post('/', (req, res) => {
   countries.push(req.body.country)
   res.render('countrieslist', { countries })
   console.log(`Country posted: ${req.body.country}`)
})

/** POST country with json data received */
router.post('/json', (req, res) => {
   countries.push(req.body.country)
   id = JSON.stringify({ id: countries.length-1})
   console.log(`Country posted (as json data): ${req.body.country}`)
   res.send(id)
})

/** GET single country */
router.get('/:id', (req, res, next) => {
   const countryId = parseInt(req.params.id)
   const qstring = req.query.qstr

   if(countryId >= countries.length || isNaN(countryId)) {
      res.sendStatus(404)
   } else {
      res.render('countries', { countryId, countries, qstring })
   }
})

router.delete('/:id', (req, res, next) => {
   const countryId = parseInt(req.params.id)
   countries.splice(countryId, 1)
   res.send(`id: ${countryId} deleted`)
})

module.exports = router