import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import './Signin.css'
var axios = require('axios')

const Signin = (props) => {
    let history = useHistory()

    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    function login(e) {
        e.preventDefault()
        var objecttosend = JSON.stringify({
            email: data.email,
            password: data.password,
        })

        var config = {
            method: 'post',
            url: 'http://localhost:7000/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: objecttosend,
        }

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data))
                if (response.data.error === 109) {
                    setError(response.data.message)
                }
                if (response.data.done === 200) {
                    localStorage.setItem(
                        'etudiant',
                        JSON.stringify(response.data.token),
                    )
                    localStorage.setItem(
                        'id',
                        JSON.stringify(response.data.user._id),
                    )
                    history.push({
                        pathname: '/accueil',
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <div className='Sign-in'>
            <div className='form-v5-content'>
                <form className='form-detail'>
                    <h1>Connectez-vous à votre compte </h1>
                    <div className='form-row'>
                        <label for='email'> Votre Email</label>
                        <input
                            type='email'
                            id='email'
                            value={data.email}
                            onChange={(e) => handle(e)}
                        />
                    </div>
                    <div className='form-row'>
                        <label for='password'> Votre Mot de passe </label>
                        <input
                            type='password'
                            id='password'
                            value={data.password}
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
                            className='error'
                        >
                            {props.error || error}
                        </div>
                    )}
                    <div className='form-row-last'>
                        <Button onClick={(e) => login(e)} variant='primary'>
                            Confirmer{' '}
                        </Button>
                    </div>
                    <br />
                    <span className='login'>
                        {' '}
                        Vous n'avez pas un compte ?
                        <Link to='/sign-up'> S'inscrire </Link>
                    </span>{' '}
                </form>
            </div>
        </div>
    )
}
export default Signin
