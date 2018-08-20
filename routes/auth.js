const express = require('express')
const controller = require('../controllers/auth.js')
const router = express.Router()

// localhost:500/api/auth/login
router.post('/login', controller.login)

// localhost:500/api/auth/register
router.post('/register', controller.register)


module.exports = router