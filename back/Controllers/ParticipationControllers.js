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
            message: 'La participation est crée',
            particiaption_save,
        })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//get Participation_byIdUSER

module.exports = { new_participation }
