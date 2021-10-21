import React from 'react'
import Header from '../header/Header'
import Information from './Information'
import './Information.css'

export default function Accueil() {
    return (
        <div>
            <div className='accueil'>
                <Header />
                <Information />
            </div>
        </div>
    )
}
