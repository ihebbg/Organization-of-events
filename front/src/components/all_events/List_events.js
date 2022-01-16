import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import './List_event.css'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'
const axios = require('axios')

export default function List_events() {
    const [event, setEvent] = useState([])
    // const [participation, setParticipation] = useState([])

    const participer = async (idUser, idEvent) => {
        var object_participer = JSON.stringify({
            user: localStorage
                .getItem('id')
                .substring(1, localStorage.getItem('id').length - 1),
            evenement: event._id,
        })

        var config = {
            method: 'post',
            url: `http://localhost:7000/participation/${JSON.parse(
                localStorage.getItem('id'),
            )}/${idEvent}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: object_participer,
        }

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data))
                alert('Vous avez participé à cette évènement')
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const fetchEvents = async () => {
        var config = {
            method: 'get',
            url: 'http://localhost:7000/all-events/',
            headers: {},
        }
        try {
            const res = await axios(config)
            console.log(JSON.stringify(res.data))
            setEvent(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])
    return (
        <div className='all_events'>
            <Header />
            <div className='table container'>
                <table className=' table table-fluid table-responsive-md table-hover table-bordered '>
                    <caption> Liste de tous les évènements </caption>
                    <thead>
                        <tr>
                            <th scope='col'> #</th>
                            <th scope='col'>Nom d'évènement</th>
                            <th scope='col'>Type</th>
                            <th scope='col'>Nombre de participations</th>
                            <th scope='col'>Date d'évènement</th>
                            <th scope='col'>Commentaire</th>
                            <th scope='col'>Place</th>
                            <th scope='col'>Salle</th>
                            <th scope='col'>Ville</th>
                            <th scope='col'>Adresse</th>
                            <th scope='col'>Organisateur</th>
                            <th scope='col'>Participer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {event.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td> {index + 1}</td>
                                    <td> {item.name_evenement}</td>
                                    <td> {item.type}</td>
                                    <td> {item.participants_number}</td>
                                    <td> {item.date_evenement}</td>
                                    <td> {item.commentaire}</td>
                                    <td> {item.place}</td>
                                    <td> {item.salle}</td>
                                    <td> {item.ville}</td>
                                    <td> {item.adress}</td>
                                    <td> {item.User.full_name}</td>

                                    <td>
                                        <button
                                            className='btn btn-primary'
                                            onClick={() =>
                                                participer(
                                                    localStorage.getItem('id'),
                                                    item._id,
                                                )
                                            }
                                        >
                                            <BsFillArrowUpSquareFill />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
