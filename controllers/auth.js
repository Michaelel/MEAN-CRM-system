const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email })
  if (candidate) {
    // Existing User
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // Generation token. Passwords are same
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, keys.jwt, { expiresIn: 3600 })

      res.status(200).json({
        token: `Bearer ${token}`,
      })
    } else {
      res.status(401).json({
        message: 'Password is incorrect. Try again.',
      })
    }
  } else {
    // User not found. Error
    res.status(404).json({
      message: 'User with this email not found.',
    })
  }
}

module.exports.register = async (req, res) => {
  // email password
  const candidate = await User.findOne({ email: req.body.email })
  if (candidate) {
    // Existing user => error
    res.status(409).json({
      message: 'This email address is already being used. Try another.',
    })
  } else {
    // Need to create new user
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    })

    try{
      await user.save()
      res.status(201).json(user)
    }
    catch (e) {
      // Handle error
      errorHandler(res, e)
    }
  }

}