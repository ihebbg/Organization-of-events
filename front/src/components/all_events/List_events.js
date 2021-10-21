import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import './List_event.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next'
import * as reactBootstrap from 'react-bootstrap'
const axios = require('axios')

export default function List_events() {
    const [event, setEvent] = useState([])
    const [loading, setLoading] = useState(false)
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
            setLoading(true)
        } catch (error) {
            console.log(error)
        }
    }
    const columns = [
        { dataField: 'name_evenement', text: 'Nom évènement' },
        { dataField: 'type', text: 'Type évènement' },
        { dataField: 'participants_number', text: 'Nombre de participants' },
        { dataField: 'date_evenement', text: 'Date évènement' },
        { dataField: 'commentaire', text: 'Commentaire' },
        { dataField: 'place', text: 'Place' },
        { dataField: 'salle', text: 'Salle' },
        { dataField: 'ville', text: 'La ville' },
        { dataField: 'adress', text: 'Adresse' },
        { text: 'Participer' },
    ]
    useEffect(() => {
        fetchEvents()
    }, [])
    return (
        <div>
            <Header />
            <h2> Les des tous les évènements</h2>
            <div className='table container'>
                {loading ? (
                    <BootstrapTable
                        keyField='name'
                        data={event}
                        columns={columns}
                        pagination={paginationFactory()}
                    />
                ) : (
                    <reactBootstrap.Spinner animation='border' />
                )}

                {/* <table
                    className=' table table-fluid table-responsive-md table-hover table-bordered'
                    id='myTable'
                >
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
                                    <td>
                                        <span>Participer</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> */}
            </div>
        </div>
    )
}
