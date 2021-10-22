const express = require('express')
const router = express.Router()
const EvenementsControllers = require('../Controllers/EvenementControllers')
router.post('/ajouter-even', EvenementsControllers.add_evenement)
router.get('/all-events', EvenementsControllers.all_events)
router.get('/my-events/:idEtud', EvenementsControllers.event_byid)
router.delete('/events/:idEvent', EvenementsControllers.delete_event)
module.exports = router
