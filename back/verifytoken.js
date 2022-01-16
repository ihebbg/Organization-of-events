const jwt = require('jsonwebtoken')

//midlware function //we can protect any root we want by this function
module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('access denied')

    try {
        const veridied = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = veridied
        next()
    } catch (err) {
        res.status(400).send('invalid token')
    }
}
