import React, { useState } from 'react'
import Header from '../header/Header'
import './FormEvent.css'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert'
const axios = require('axios')

export default function FormEvent(props) {
    const [place, setPlace] = useState()
    const [data, setData] = useState({})
    const [error, setError] = useState('')

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    const handleChange = (e) => {
        const target = e.target
        if (target.checked) {
            setPlace(target.value)
        }
    }
    function clearData(e) {
        e.preventDefault()
        setData({
            name_evenement: '',
            type: '',
            participants_number: '',
            date_evenement: '',
            commentaire: '',
            place: '',
            salle: '',
            city: '',
            adress: '',
        })
    }
    function add_event(e) {
        e.preventDefault()
        var object_event = JSON.stringify({
            name_evenement: data.name_evenement,
            type: data.type,
            participants_number: data.participants_number,
            date_evenement: data.date_evenement,
            commentaire: data.commentaire,
            place: data.place,
            salle: data.salle,
            city: data.city,
            adress: data.adress,
            User: localStorage
                .getItem('id')
                .substring(1, localStorage.getItem('id').length - 1),
        })

        var config = {
            method: 'post',
            url: 'http://localhost:7000/ajouter-even',
            headers: {
                'Content-Type': 'application/json',
            },
            data: object_event,
        }

        axios(config)
            .then(function (response) {
                if (response.data.error === 108) {
                    setError(response.data.message)
                } else {
                    swal('Évènment est ajouté avec succés')
                    clearData(e)
                }
                // console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div className='event-component'>
            <Header />
            <br />
            <h2> Organiser un évènement</h2>
            <form className='form-event container'>
                <div className='form-row'>
                    <div className='form-group col-md-6 '>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label for='name_evenement'>Nom d'évènement:</label>
                        <input
                            onChange={(e) => handle(e)}
                            type='text'
                            className='form-control'
                            id='name_evenement'
                            placeholder="Proposer un nom pour l'évènement"
                        />
                    </div>
                    <div className='form-group col-md-6 '>
                        <label for='name_evenement'>Type d'évènement:</label>

                        <input
                            onChange={(e) => handle(e)}
                            type='text'
                            class='form-control'
                            id='type'
                            placeholder="Ecrire le type d'évènement "
                        />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label for='name_evenement'>
                            Nombre de participations:
                        </label>
                        <input
                            onChange={(e) => handle(e)}
                            type='number'
                            className='form-control'
                            id='participants_number'
                            placeholder=' Ecrire le nombre de participations'
                        />
                    </div>
                    <div class='form-group col-md-6'>
                        <label for='name_evenement'>Date d'évènement:</label>
                        <input
                            onChange={(e) => handle(e)}
                            type='date'
                            className='form-control'
                            id='date_evenement'
                        />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label for='name_evenement'>Commentaire: </label>
                        <textarea
                            onChange={(e) => handle(e)}
                            className='form-control'
                            id='commentaire'
                            rows='3'
                            placeholder='Ecrire votre commentaire ici...'
                        />
                    </div>
                    <div className='form-group col-md-6'>
                        <label>Choisir le place d'évènement:</label>
                        <br />
                        <label>
                            {' '}
                            ISAMM &nbsp;&nbsp;
                            <input
                                onChange={(e) => {
                                    handleChange(e)
                                    handle(e)
                                }}
                                checked={place === 'isamm'}
                                value='isamm'
                                id='place'
                                type='radio'
                                name='isamm'
                                onClick={show1}
                            />
                            &nbsp;&nbsp;
                        </label>
                        &nbsp;&nbsp;
                        <label>
                            {' '}
                            Autres &nbsp;&nbsp;
                            <input
                                onChange={(e) => {
                                    handleChange(e)
                                    handle(e)
                                }}
                                id='place'
                                value='autre'
                                type='radio'
                                name='autre'
                                onClick={show2}
                                checked={place === 'autre'}
                            />
                        </label>
                    </div>
                </div>
                <div
                    className='form-row'
                    id='test1'
                    style={{ display: 'none' }}
                >
                    <div className='form-group col-md-6'>
                        <label for='name_evenement'>Salle: </label>
                        <input
                            onChange={(e) => handle(e)}
                            type='text'
                            className='form-control'
                            id='salle'
                            placeholder='Ecrire la salle disponible pour l`évènement'
                        />
                    </div>{' '}
                </div>
                <div
                    className='form-row'
                    id='test2'
                    style={{ display: 'none' }}
                >
                    <div className='form-group col-md-6'>
                        <label for='name_evenement'> La ville: </label>
                        <input
                            onChange={(e) => handle(e)}
                            type='text'
                            className='form-control'
                            id='city'
                            placeholder='Choisir la ville'
                        />
                    </div>{' '}
                    <div className='form-group col-md-6'>
                        <label for='name_evenement'> Adresse: </label>
                        <input
                            onChange={(e) => handle(e)}
                            type='text'
                            className='form-control'
                            id='adress'
                            placeholder='Choisir l`adresse'
                        />
                    </div>{' '}
                </div>
                {error && (
                    <div
                        style={{
                            color: 'red',
                            textAlign: 'center',
                            fontSize: '18px',
                        }}
                        severity='error'
                        onClick={() => setError(null)}
                    >
                        {props.error || error}
                    </div>
                )}
                <br />
                <Button onClick={(e) => add_event(e)} variant='primary'>
                    Confirmer{' '}
                </Button>
            </form>
        </div>
    )
    function show1() {
        document.getElementById('test1').style.display = 'block'
        document.getElementById('test2').style.display = 'none'
    }
    function show2() {
        document.getElementById('test2').style.display = 'block'
        document.getElementById('test1').style.display = 'none'
    }
}
