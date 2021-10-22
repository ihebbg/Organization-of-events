import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import { BsFillTrashFill } from 'react-icons/bs'
import { BsFillPencilFill } from 'react-icons/bs'
import './List_event.css'
const axios = require('axios')

export default function List_my_events() {
    const [myevents, setMyevents] = useState([])
    const fetchEvents = async () => {
        var config = {
            method: 'get',
            url: `http://localhost:7000/my-events/${JSON.parse(
                localStorage.getItem('id'),
            )}`,
            headers: {},
        }
        try {
            const res = await axios(config)
            // console.log(JSON.stringify(res.data))
            setMyevents(res.data)
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
                    <caption> Liste de tous mes évènements </caption>
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
                            <th scope='col'>Opérations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myevents.map((item, index) => {
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
                                    <td>
                                        <button className='btn btn-danger'>
                                            <BsFillTrashFill />
                                        </button>
                                        <button className='btn btn-default'>
                                            <BsFillPencilFill />
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
