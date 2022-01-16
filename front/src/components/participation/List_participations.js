import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import { BsFillTrashFill } from 'react-icons/bs'
import { BsFillEyeFill } from 'react-icons/bs'
import './List_participations.css'
import swal from 'sweetalert'

const axios = require('axios')

export default function List_participations() {
    const [participation, setParticipation] = useState([])

    const annulerParticipation = async (idPart) => {
        var config = {
            method: 'post',
            url: `http://localhost:7000/participation/${idPart}`,
            headers: {},
        }
        axios(config)
            .then(function (response) {
                swal({
                    title: ' Vous avez annuler votre particiaption avec succès',
                    text: '',
                    icon: 'success',
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const fetchParticipation = async () => {
        var config = {
            method: 'get',
            url: `http://localhost:7000/participation/${JSON.parse(
                localStorage.getItem('id'),
            )}`,
            headers: {},
        }

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data))
                setParticipation(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchParticipation()
    }, [participation])
    return (
        <div className='participations'>
            <Header />
            <div className='table container'>
                <table className=' table table-fluid table-responsive-md table-hover table-bordered '>
                    <caption> Liste de tous mes participations </caption>
                    <thead>
                        <tr>
                            <th scope='col'> #</th>
                            <th scope='col'>Nom d'évènement</th>
                            <th scope='col'>Date d'évènement</th>
                            <th scope='col'>Place</th>
                            <th scope='col'>Salle</th>
                            <th scope='col'>Ville</th>
                            <th scope='col'>Adresse</th>
                            <th scope='col'>Annuler</th>
                            <th scope='col'>Voir participants</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participation.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td> {index + 1}</td>
                                    <td> {item.evenement.name_evenement}</td>
                                    <td> {item.evenement.date_evenement}</td>
                                    <td> {item.evenement.place}</td>
                                    <td> {item.evenement.salle}</td>
                                    <td> {item.evenement.ville}</td>
                                    <td> {item.evenement.adress}</td>
                                    <td>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() =>
                                                window.confirm(
                                                    'Êtes-vous sûr de vouloir annler votre participation',
                                                ) &&
                                                annulerParticipation(item._id)
                                            }
                                        >
                                            <BsFillTrashFill />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className='btn btn-primary'
                                            onClick={() =>
                                                window.confirm(
                                                    'Êtes-vous sûr de vouloir voire les participants',
                                                )
                                            }
                                        >
                                            <BsFillEyeFill />{' '}
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
