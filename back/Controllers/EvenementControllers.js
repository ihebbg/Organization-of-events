const Evenement = require('../Models/Evenement')
require('../Models/User')
const { validation_event } = require('../Validations/ValidationEvent')
// const Participation = require('../Models/Participation')

// add event

const add_evenement = async (req, res) => {
    //validation les champs
    const { error } = validation_event(req.body) //vérifier la validation de la requete
    if (error)
        return res.send({ message: error.details[0].message, error: 108 }) //afficher erreur
    if (req.body.place === 'isamm') {
        const evenement = new Evenement({
            name_evenement: req.body.name_evenement,
            type: req.body.type,
            participants_number: req.body.participants_number,
            date_evenement: req.body.date_evenement,
            commentaire: req.body.commentaire,
            place: req.body.place,
            salle: req.body.salle,
            User: req.body.User,
        })

        try {
            const evenement_save_isamm = await evenement.save()
            res.json({
                message: 'Évènement est ajouté avec success',
                evenement_save_isamm,
            })
        } catch (error) {
            res.status(400).json({ message: error })
        }
        // const participation = new Participation({
        //     user: req.params._idUser,
        //     evenement: evenement_save._id,
        // })
        // try {
        // } catch (error) {
        //     const particiaption_save = await participation.save()
        //     res.json({ message: 'done', particiaption_save })
        // }
    }
    if (req.body.place === 'autre') {
        const evenement = new Evenement({
            name_evenement: req.body.name_evenement,
            type: req.body.type,
            participants_number: req.body.participants_number,
            date_evenement: req.body.date_evenement,
            commentaire: req.body.commentaire,
            place: req.body.place,
            city: req.body.city,
            adress: req.body.adress,
            User: req.body.User,
        })
        try {
            const evenement_save_autre = await evenement.save()
            res.json({ message: 'Evenement saved', evenement_save_autre })
        } catch (error) {
            res.status(400).json({ message: error })
        }
        // const participation = new Participation({
        //     user: req.params._idUser,
        //     evenement: evenement_save._id,
        // })
        // try {
        // } catch (error) {
        //     const particiaption_save = await participation.save()
        //     res.json({ message: 'done', particiaption_save })
        // }
    }
}

// get all events
const all_events = async (req, res) => {
    try {
        const events = await Evenement.find().populate({
            path: 'User',
        })
        res.status(200).json(events)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//get events by id student
const event_byid = async (req, res) => {
    try {
        const events = await Evenement.find({ User: req.params.idEtud })
        res.status(200).json(events)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Delete event
const delete_event = async (req, res) => {
    try {
        const event_delete = await Evenement.remove({
            _id: req.params.idEvent,
        })
        res.status(200).json(delete_event)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
module.exports = { add_evenement, all_events, event_byid, delete_event }
