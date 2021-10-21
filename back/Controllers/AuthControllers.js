const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    loginvalidation,
    registervalidation,
} = require('../Validations/ValidationUser')
require('dotenv').config()

const register = async (req, res) => {
    //validation les champs
    const { error } = registervalidation(req.body) //vérifier la validation de la requete
    if (error)
        return res.send({ message: error.details[0].message, error: 108 }) //afficher erreur
    //check email
    const email_user = await User.findOne({ email: req.body.email })
    if (email_user)
        return res.send({ message: 'Email already exists', error: 108 })

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashmdp = await bcrypt.hash(req.body.password, salt)
    const hashconfmdp = await bcrypt.hash(req.body.confpassword, salt)

    //check confirmation passsword
    if (req.body.password !== req.body.confpassword)
        return res.send({ message: 'Passwords must be the same', error: 108 })

    // sign up
    const user = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        password: hashmdp,
        confpassword: hashconfmdp,
    })
    try {
        const save_user = await user.save()
        res.json({ message: 'user saved', save_user })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const login = async (req, res) => {
    //validation les champs
    const { error } = loginvalidation(req.body) // vérifier la validation de la requete
    if (error)
        return res.send({ message: error.details[0].message, error: 109 }) // afficher erreur
    // user not found
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.send({ message: 'Wrong email !', error: 109 })

    const validpassword = await bcrypt.compare(req.body.password, user.password)
    if (!validpassword)
        return res.send({ message: 'Wrong password !', error: 109 })

    //create and assign a token

    const token = jwt.sign(
        { _id: user._id, email: user },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '5',
        },
    )

    res.header('auth-token', token).send({
        done: 200,
        token: token,
        message: 'logged in !',
        user: user,
    }) //sen token in header
}
const getProfile = async (req, res) => {
    try {
        const specific_etudiant = await User.findById({
            _id: req.params.idUser,
        })
        res.json(specific_etudiant)
        //console.log(" GETSPEC successefly")
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = { register, login, getProfile }
