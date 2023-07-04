import './App.css';
import {Routes, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import FormBar from "./components/formBar"
import Map from './components/map';
import AddReview from './components/add-review';
import Doctor from './components/doctors';
import doctorList from './components/doctor-list';
import Login from './components/login';


import { canadaCities } from "./scrape/data"
function App()
{
    const [user, setUser] = React.useState(null);

    async function login(user = null)
    {
        setUser(user);
    }

    async function logout()
    {
        setUser(null);
    }

    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/doctors">Find Your Doctor</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to={"/doctors"} className="nav-link">Doctors</Link>
                        </li>
                        <li class="nav-item">
                            <Link to={"/calendar"} className="nav-link">Calendar</Link>
                        </li>
                        <li class="nav-item">
                            { user ? (
                            <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                                Logout {user.name}
                            </a>
                            ) : (
                            <Link to={"/login"} className="nav-link login-link">
                                Login
                            </Link>
                            )}
                        </li>

                    </ul>
                </div>
            </nav>
            <FormBar
                cities={canadaCities}
            />
            <Map />
        </div>
    )
}
export default App;