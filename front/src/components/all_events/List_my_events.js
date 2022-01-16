import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import { BsFillTrashFill } from 'react-icons/bs'
import { BsFillPencilFill } from 'react-icons/bs'
import './List_event.css'
import swal from 'sweetalert'
import { Modal, Button, Form } from 'react-bootstrap'

const axios = require('axios')

export default function List_my_events(props) {
    const [myevents, setMyevents] = useState([])
    const [eventsupdate, setEventsupdate] = useState({})
    function handle(e) {
        const newdata = { ...eventsupdate }
        newdata[e.target.id] = e.target.value
        setEventsupdate(newdata)
    }
    //modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    //fetch data function
    const fetchEvents = async () => {
        let config = {
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
    //get event
    const get_event = (idEvent) => {
        axios
            .get(`http://localhost:7000/events/${idEvent}`)
            .then((res) => {
                console.log(res)
                setEventsupdate(res.data.event)
                handleShow()
            })
            .catch((err) => console.log(err))
    }
    // update event function
    const update_event = (e, idEvent) => {
        let request = {
            name_evenement: eventsupdate.name_evenement,
            type: eventsupdate.type,
            participants_number: parseInt(eventsupdate.participants_number),
            date_evenement: eventsupdate.date_evenement,
            commentaire: eventsupdate.commentaire,
            place: eventsupdate.place,
            salle: eventsupdate.salle,
            city: eventsupdate.city,
            adress: eventsupdate.adress,
        }
        e.preventDefault()

        axios
            .put(`http://localhost:7000/events/${idEvent}`, request)
            .then(() => {
                handleClose()
            })
            .catch((err) => {
                console.log(err)
            })
        // console.log('test')
    }
    //delete event function
    function delete_event(idEvent) {
        var config = {
            method: 'post',
            url: `http://localhost:7000/events/${idEvent}`,
            headers: {},
        }

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data))
                swal({
                    title: ' Vous avez supprimer évènement avec succès',
                    text: '',
                    icon: 'success',
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchEvents()
    }, [myevents])
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
                                    <td> {item.city}</td>
                                    <td> {item.adress}</td>
                                    <td>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() =>
                                                window.confirm(
                                                    'Êtes-vous sûr de vouloir supprimer cet évènement',
                                                ) && delete_event(item._id)
                                            }
                                        >
                                            <BsFillTrashFill />
                                        </button>
                                        <button
                                            className='btn btn-default'
                                            onClick={() => get_event(item._id)}
                                        >
                                            <BsFillPencilFill />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier un évènement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={(e) => {
                            update_event(e, eventsupdate._id)
                        }}
                    >
                        <div className='form-row'>
                            <span>Nom:</span>
                            <div className='col'>
                                <input
                                    id='name_evenement'
                                    type='text'
                                    defaultValue={eventsupdate.name_evenement}
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                            <sapn>Type:</sapn>
                            <div className='col'>
                                <input
                                    id='type'
                                    type='text'
                                    defaultValue={eventsupdate.type}
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                            <span> Nombre de participants:</span>
                            <div className='col'>
                                <input
                                    id='participants_number'
                                    defaultValue={
                                        eventsupdate.participants_number
                                    }
                                    type='number'
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                        </div>
                        <br></br>
                        <div className='form-row'>
                            <span> Date:</span>
                            <div className='col'>
                                <input
                                    onChange={(e) => handle(e)}
                                    defaultValue={eventsupdate.date_evenement}
                                    type='date'
                                    id='date_evenement'
                                    className='form-control'
                                ></input>
                            </div>
                            <sapns> Commentaire :</sapns>
                            <div className='col'>
                                <input
                                    id='commentaire'
                                    onChange={(e) => handle(e)}
                                    defaultValue={eventsupdate.commentaire}
                                    type='text'
                                    className='form-control'
                                ></input>
                            </div>
                            <span> Place:</span>
                            <div className='col'>
                                <input
                                    id='place'
                                    defaultValue={eventsupdate.place}
                                    type='text'
                                    className='form-control'
                                ></input>
                            </div>
                        </div>
                        <br></br>
                        <div className='form-row'>
                            <span>Salle: </span>
                            <div className='col'>
                                <input
                                    id='salle'
                                    onChange={(e) => handle(e)}
                                    defaultValue={eventsupdate.salle}
                                    type='text'
                                    className='form-control'
                                ></input>
                            </div>
                            <span>Ville:</span>
                            <div className='col'>
                                <input
                                    id='city'
                                    defaultValue={eventsupdate.city}
                                    type='text'
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                            <span>Adresse:</span>
                            <div className='col'>
                                <input
                                    id='adress'
                                    defaultValue={eventsupdate.adress}
                                    onChange={(e) => handle(e)}
                                    type='text'
                                    className='form-control'
                                ></input>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant='primary' type='submit'>
                                Confirmer
                            </Button>
                            <Button variant='default' onClick={handleClose}>
                                Annuler
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
