const express = require('express')
const router = express.Router()
const EvenementsControllers = require('../Controllers/EvenementControllers')
router.post('/ajouter-even', EvenementsControllers.add_evenement)
router.get('/all-events', EvenementsControllers.all_events)
router.get('/my-events/:idEtud', EvenementsControllers.event_byid)
router.post('/events/:idEvent', EvenementsControllers.delete_event)
router.get('/events/:idEvent', EvenementsControllers.get_event_byid)
router.put('/events/:idEvent', EvenementsControllers.update_event)

module.exports = router
