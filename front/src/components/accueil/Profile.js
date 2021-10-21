import React, { useEffect, useState } from 'react'

// import { useHistory } from 'react-router-dom'
import axios from 'axios'
export default function Profile() {
    const [profile, setProfile] = useState({})
    const getprofile = () => {
        axios
            .get(
                `http://localhost:7000/accueil/${JSON.parse(
                    localStorage.getItem('id'),
                )}`,
            )
            .then((res) => {
                console.log(res.data)
                setProfile(res.data)
            })

            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getprofile()
    }, [profile])

    return (
        <h2
            style={{
                textAlign: 'center',
                color: 'WHITE',
                fontFamily: 'revert',
                backgroundColor: ' rgb(20, 21, 26)',
            }}
        >
            Bienvenue {profile.full_name} à votre espace d'évènement de ISAMM.
        </h2>
    )
}
