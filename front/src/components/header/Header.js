import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import './Header.css'
export default function Header() {
    return (
        <div>
            <nav className='navbar navbar-expand-md bg-dark'>
                <img src={logo} alt='ISAMM' />
                <div className=' navbar-collapse'>
                    <ul className='navbar-nav m-auto'>
                        <li className='nav-item active'>
                            <Link
                                className='nav-link'
                                to='/accueil'
                                style={{ color: 'white' }}
                            >
                                Accueil
                            </Link>
                        </li>
                        <li className='nav-item '>
                            <Link
                                className='nav-link'
                                to='/évènements'
                                style={{ color: 'white' }}
                            >
                                Tous évènements
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                to='/ajouter-évènement'
                                style={{ color: 'white' }}
                            >
                                Nouveau évènement{' '}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                to='/mes-évènements'
                                style={{ color: 'white' }}
                            >
                                Mes évènements
                            </Link>
                        </li>
                        <li class='nav-item'>
                            <Link
                                className='nav-link'
                                to='/mes-participations'
                                style={{ color: 'white' }}
                            >
                                Mes participations
                            </Link>
                        </li>
                    </ul>
                    <form className='form-inline my-2 my-lg-0'>
                        <button
                            className='btn btn-outline-warning my-2 my-sm-0'
                            type='submit'
                        >
                            Déconnexion
                        </button>
                    </form>
                </div>
            </nav>
        </div>
    )
}
