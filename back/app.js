const express = require('express')
const request = require('request')
const app = express()
require('./connexion')
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const route_auth = require('./Routes/AuthRoutes')
const route_even = require('./Routes/EvenementRoutes')
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    )
    next()
})
app.use('/', route_auth)
app.use('/', route_even)

app.get('/accueil', (req, res) => {
    const city = 'Manouba'
    request(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=d70aea3ef77222dbdbcf35827f17faf2

        `,
        function (error, response, body) {
            let data = JSON.parse(body)
            if (response.statusCode === 200) {
                res.json({
                    message: `${data.weather[0].description} ${data.main.temp}°C vent: ${data.wind.speed}Km/H -${data.wind.deg}°`,
                })
            }
        },
    )
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
