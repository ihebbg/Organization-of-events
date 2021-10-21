const express = require('express')
const router = express.Router()
const AuthControllers = require('../Controllers/AuthControllers')

router.post('/register', AuthControllers.register)
router.post('/login', AuthControllers.login)
router.get('/accueil/:idUser', AuthControllers.getProfile)
module.exports = router
