const express = require('express')

let router = express.Router()

// Controller
const sawController = require('../api/saw/sawController')

router.post('/saw', sawController.getRecomendation)


module.exports = router