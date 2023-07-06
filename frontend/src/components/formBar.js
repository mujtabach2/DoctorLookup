import React, { useState, useEffect } from 'react';
import { canadaCities, specialties } from '../scrape/data';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './formbar.css';
import DoctorDataService from '../services/doctor.js';
import { Link } from 'react-router-dom';
import Map from './map';

export default function FormBar() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

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
    doctorDataService.getAll()
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      {doctors.length > 0 && (
        <div className="App">
          <Map
            google={window.google}
            style={{ width: '100%', height: '400px' }}
            initialCenter={mapCenter}
            zoom={10}
          >
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                lat={doctor.latitude}
                lng={doctor.longitude}
                name={doctor.name}
              />
            ))}
          </Map>
          {doctors.map((doctor) => {
            return (
              <div key={doctor.id}>
                <img
                  className="card-img-top"
                  src={doctor.imgUrl}
                  alt="Card image cap"
                />
                <div className="card" style={{ width: '18rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">{doctor.name}</h5>
                    <h3 className="card-text">{doctor.specialty}</h3>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{doctor.star}</li>
                    <li className="list-group-item">{doctor.address}</li>
                    <li className="list-group-item">{doctor.reviews}</li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
