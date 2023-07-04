
import './App.css';
import {Switch, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import FormBar from "./components/formBar"
import Map from './components/map';
import addReview from './components/add-review';
import doctors from './components/doctors';
import doctorList from './components/doctor-list';
import Login from './components/login';
//// issue with navbar fix that part yes

import { canadaCities } from "./scrape/data"
export default function App()
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/doctors">Find Your Doctor</a>                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                    <Link to={"/doctors"} className="nav-link"> Doctors </Link>
                    </li>
                    <li class="nav-item">
                        {/* <Link to={"/calandar"} className="nav-link">Calander</Link> */}
                    </li>
                    <li class="nav-item">
                       { user ? (
                            <a onClick={logout} className="nav-link" style={{cursor: 'pointer'}}>
                                Logout {user.name}
                            </a>
                        ) : (
                            <Link to={"/login"} className="nav-link">
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