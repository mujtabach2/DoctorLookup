import React, { useState, useEffect } from 'react';
import { canadaCities, specialties } from '../scrape/data';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './formbar.css';
import DoctorDataService from '../services/doctor.js';
import DoctorList from './doctor-list.js';

export default function FormBar({user}) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [showMap, setShowMap] = useState(false);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    retrieveDoctors();
  };

  const retrieveDoctors = () => {
    const doctorDataService = new DoctorDataService();
    const queryParams = {};
  
    if (selectedCity) {
      const cityObj = JSON.parse(selectedCity); // Convert selectedCity to an object
      queryParams.city = cityObj.city; // Extract the city property
    }
    if (selectedSpecialty) {
      queryParams.specialty = selectedSpecialty;
    }
  
  
    doctorDataService.getDoctors(queryParams)
      .then((response) => {
        console.log(response.data);
        setDoctors(response.data.doctors);
       setMapCenter({ lat: response.data.latitude, lng: response.data.longitude });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  

  useEffect(() => {
    retrieveDoctors();
  }, []);

  return (
    <div className="container">
    <div className="container oval-container">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="cityDropdown" className="col-form-label">
                City
              </label>
              <select id="cityDropdown" className="form-select" value={selectedCity} onChange={handleCityChange}>
                <option value="">-- Select --</option>
                {canadaCities.map((city) => (
                  <option
                    key={`${city.province}-${city.city}`}
                    value={JSON.stringify(city)}
                  >{`${city.city.charAt(0).toUpperCase() + city.city.slice(1)}, ${city.province.toUpperCase()}`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="specialtyDropdown" className="col-form-label">
                Specialty
              </label>
              <select
                id="specialtyDropdown"
                className="form-select"
                value={selectedSpecialty}
                onChange={handleSpecialtyChange}
              >
                <option value="">-- Select --</option>
                {specialties.map((specialty) => (
                  <option
                    key={`${specialty}-${specialty}`}
                    value={specialty}
                  >{specialty.charAt(0).toUpperCase() + specialty.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="locationInput" className="col-form-label">
                Location
              </label>
              <input
                type="text"
                id="locationInput"
                className="form-control"
                name="location"
                value={location}
                onChange={handleLocationChange}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <button onClick={()=> setShowMap(!showMap)}type="submit" className="btn btn-primary" style={{background: 'linear-gradient(91deg, #18A1CC 0%, #92D1FF 100%)'}}>
            Submit
          </button>
        </div>
      </form>
     
    </div>
    {doctors.length > 0 && showMap && (
   

          <div className="App">
            <DoctorList user={user}clientAddress={location} doctors={doctors} />
          </div> 
        )}
    
  
    </div>);
}
