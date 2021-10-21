import React, { useState } from 'react'
import './Information.css'
import facebook from '../../images/facebook.png'
import linkedin from '../../images/linkedin.png'
import web from '../../images/web.png'
import meteo from '../../images/meteo.png'
import Profile from './Profile'
const axios = require('axios')

export default function Information(props) {
    const [data, setData] = useState('')
    var config = {
        method: 'get',
        url: 'http://localhost:7000/accueil',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data))
            setData(response.data.message)
        })
        .catch(function (error) {
            console.log(error)
        })
    return (
        <div className='container'>
            <div className='profile'>
                <Profile></Profile>
                <hr></hr>
            </div>
            <p>
                <span> Tous évènements:</span> Pour consulter tous les
                évènements de l'école publiées par vos colléques.
            </p>
            <p>
                <span> Nouveau évènement:</span> Pour créer un nouveau
                évènements que vos colléques peuvent y participer.
            </p>
            <p>
                <span> Mes évènements:</span> Pour consulter tous les évènements
                que vous avez créees.
            </p>
            <p>
                <span> Mes participations:</span> Pour consulter tous les
                évènements que vous participrons.
            </p>
            <hr></hr>
            <div className='meteo'>
                <strong> MÉtÈ DU JOUR À MANOUBA</strong>
                <br />
                <img src={meteo} width='7%' alt='weather' />
                <br />
                {data}
            </div>
            <hr></hr>
            <div className='footer'>
                <strong> Nous Suivre</strong>
                <br /> <br />
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='thumbnail'>
                            <a href='https://www.facebook.com/ISAMM-Institut-Sup%C3%A9rieur-des-Arts-Multim%C3%A9dia-de-la-Manouba-161897532043/'>
                                <img
                                    src={facebook}
                                    alt='facebook'
                                    width='15%'
                                />
                            </a>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='thumbnail'>
                            <a href='https://www.linkedin.com/school/isamm-manouba/'>
                                <img
                                    src={linkedin}
                                    alt='instagram'
                                    width='15%'
                                />
                            </a>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='thumbnail'>
                            <a href='http://www.isa2m.rnu.tn/'>
                                <img src={web} alt='site web' width='15%' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
