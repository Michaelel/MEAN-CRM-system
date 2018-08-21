const express = require('express')
const passport = require('passport')
const controller = require('../controllers/order.js')
const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)


module.exports = router