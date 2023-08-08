import './App.css';

import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState, useContext } from "react";
import FormBar from "./components/formBar"


import DoctorDataService from "./services/doctor.js";
import NavBar from "./components/navbar"

const UserContext = React.createContext(null);
function App()
{
    const [searchResults, setSearchResults] = React.useState([]);
    const doctorDataService = new DoctorDataService();
    const [user, setUser] = React.useState(null);

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const userParam = urlParams.get("user");
      if (userParam) {
        const userData = JSON.parse(decodeURIComponent(userParam));
        setUser(userData);
      }
    }, []);
  
  
    const logout = () => {
      fetch("/logout", { credentials: "include" })
        .then((res) => {
          if (res.ok) {
            console.log("Logout successful"); // Check if the redirect is happening
            window.location.href = res.url;
          } else {
            console.error("Error logging out. Response:", res);
          }
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    };
    
    
  
    const login = () => {
      fetch("/login", { credentials: "include" })
        .then((res) => {
          if (res.ok) {
            window.location.href = "https://doctorlook.onrender.com/api/v1/doctors/login"; // Redirect to the login page on the backend
          } else {
            console.error("Error logging in:", res.statusText);
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    };
  
    async function handleSearch(city, specialty, location) {
        try {
          const response = await doctorDataService.find(location, 'location', city, specialty);
          setSearchResults(response.data);
        } catch (error) {
          console.log("Error performing search:", error);
        }
      }
      

    return(
      
        <div>
            <NavBar user={user} login={login} logout={logout} />
      
            <FormBar user={user}
            />
            {/* //<Map /> */}
        </div>
       
    );
}
export default App;