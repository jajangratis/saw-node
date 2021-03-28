const express = require('express')

let router = express.Router()

// Controller
const sawController = require('../api/saw/sawController')

router.post('/saw', sawController.getRecomendation)
router.post('/saw-interpolated', sawController.getSawWithInterpolated)
router.post('/ahp', sawController.getAhpValue)


module.exports = router