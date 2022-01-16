const Participation = require('../Models/Participation')
//create participation
const new_participation = async (req, res) => {
    const particiaption = new Participation({
        user: req.params.idUser,
        evenement: req.params.idEvent,
    })
    try {
        const particiaption_save = await particiaption.save()

        res.status(200).json({
            message: 'Vous avez participé à ce évènement',
            particiaption_save,
        })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//get specifc participation by iduser
const get_participation = async (req, res) => {
    try {
        const participations = await Participation.find({
            user: req.params.idUser,
        })
            .populate({
                path: 'user',
            })
            .populate({
                path: 'evenement',
            })
        res.status(200).json(participations)
    } catch (error) {
        res.status(200).json({ message: error })
    }
}

// Delete participation( annuler)
const delete_participation = async (req, res) => {
    try {
        const participation = await Participation.remove({
            _id: req.params.idPart,
        })
        res.status(400).json({
            message: 'Votre participation est annulé',
            participation,
        })
    } catch (error) {
        res.statsu(200).json({ message: error })
    }
}

//get Participations  byIdUSER

// const participants_byevent = async (req, res) => {
//     try {
//         const users_participation = Participation.find({

//         })
//     } catch (error) {
//         res.statsu(200).json({ message: error })
//     }
// }

module.exports = { new_participation, delete_participation, get_participation }
