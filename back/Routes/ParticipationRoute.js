const express = require('express')
const router = express.Router()
const ParticipationControllers = require('../Controllers/ParticipationControllers')
router.post(
    '/participation/:idUser/:idEvent',
    ParticipationControllers.new_participation,
)
router.post(
    '/participation/:idPart',
    ParticipationControllers.delete_participation,
)
router.get('/participation/:idUser', ParticipationControllers.get_participation)

module.exports = router
