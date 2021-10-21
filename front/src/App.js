import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
import Accueil from './components/accueil/Accueil'
import FormEvent from './components/event_/FormEvent'
import List_events from './components/all_events/List_events'
import List_my_events from './components/all_events/List_my_events'
import List_participations from './components/participation/List_participations'
function App() {
    // let authorize = false
    // if (localStorage.getItem('etudiant') != null) {
    //     authorize = true
    //     console.log(authorize)
    // }
    return (
        <Router>
            <div className='App '>
                <Switch>
                    {' '}
                    <Route exact path='/' component={Signup} />
                    <Route
                        path='/sign-in'
                        // component={authorize ? Signin : null}
                        component={Signin}
                    />
                    <Route path='/sign-up' component={Signup} />
                    <Route path='/accueil' component={Accueil} />
                    {/* {authorize ? ( */}
                    <Route
                        path='/ajouter-évènement'
                        component={FormEvent}
                    ></Route>
                    <Route path='/évènements' component={List_events} />
                    <Route path='/mes-évènements' component={List_my_events} />
                    <Route
                        path='/mes-participations'
                        component={List_participations}
                    />
                    {/* ) : (
                        <Route path='/' component={Signin} />
                    )} */}
                </Switch>
            </div>
        </Router>
    )
}

export default App
