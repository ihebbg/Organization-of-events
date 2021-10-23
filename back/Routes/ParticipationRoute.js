const express = require('express')
const router = express.Router()
const ParticipationControllers = require('../Controllers/ParticipationControllers')
router.post(
    '/participation/:idUser/:idEvent',
    ParticipationControllers.new_participation,
)
module.exports = router
