import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import './Signup.css'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
const axios = require('axios')

const Signup = (props) => {
    let history = useHistory()
    const [data, setData] = useState({
        full_name: '',
        email: '',
        password: '',
        confpassword: '',
    })
    const [error, setError] = useState('')
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    function register(e) {
        e.preventDefault()
        var objecttosend = JSON.stringify({
            full_name: data.full_name,
            email: data.email,
            password: data.password,
            confpassword: data.confpassword,
        })

        var config = {
            method: 'post',
            url: 'http://localhost:7000/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: objecttosend,
        }

        axios(config)
            .then(function (response) {
                // console.log(response)
                if (response.data.error === 108) {
                    setError(response.data.message)
                }
                if (response.data.message === 'user saved') {
                    swal({
                        title: ' Vous avez créé un compte avec succès',
                        text: '',
                        icon: 'success',
                    }).then(() => {
                        history.push('/sign-in')
                    })
                }
                // console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div className='Sign-up'>
            <div className='form-v5-content'>
                <form className='form-detail'>
                    <h1>S'inscrire</h1>
                    <div className='form-row'>
                        <label for='full_name'>Nom et Prénom </label>
                        <input
                            type='text'
                            id='full_name'
                            value={data.full_name}
                            onChange={(e) => handle(e)}
                        />
                    </div>
                    <div className='form-row'>
                        <label for='email'>Adresse email </label>
                        <input
                            type='email'
                            id='email'
                            value={data.email}
                            onChange={(e) => handle(e)}
                        />
                    </div>
                    <div className='form-row'>
                        <label for='password'>Mot de passe</label>
                        <input
                            type='password'
                            id='password'
                            value={data.password}
                            onChange={(e) => handle(e)}
                        />
                    </div>
                    <div className='form-row'>
                        <label for='confpassword'>
                            {' '}
                            Confirmation Mot de passe{' '}
                        </label>
                        <input
                            type='password'
                            id='confpassword'
                            value={data.confpassword}
                            onChange={(e) => handle(e)}
                        />
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
                    <div className='form-row-last'>
                        <Button onClick={(e) => register(e)} variant='primary'>
                            Confirmer{' '}
                        </Button>
                    </div>
                    <br />
                    <span className='login'>
                        {' '}
                        Vous avez déja un compte ?{' '}
                        <Link to='/sign-in'> Se connecter</Link>
                    </span>{' '}
                </form>
            </div>
        </div>
    )
}
export default Signup
