const express = require('express')
const controller = require('../controllers/order.js')
const router = express.Router()

router.post('/', controller.create)
router.get('/', controller.getAll)


module.exports = router