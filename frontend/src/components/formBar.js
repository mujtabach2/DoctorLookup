import React from 'react';
import { canadaCities, specialties } from "../scrape/data";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './formbar.css';
    
export default function FormBar() {
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedSpecialty, setSelectedSpecialty] = React.useState('');
  const [location, setLocation] = React.useState('');

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
  };

  return (
    <div className="container oval-container">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="cityDropdown" className="col-sm-2 col-form-label">City</label>
          <div className="col-sm-4">
            <select id="cityDropdown" className="form-select" value={selectedCity} onChange={handleCityChange}>
              <option value="">-- Select --</option>
              {canadaCities.map((city) => (
                <option key={`${city.province}-${city.city}`} value={JSON.stringify(city) }>{`${city.city.charAt(0).toUpperCase() + city.city.slice(1)}, ${city.province.toUpperCase()}`}</option>
              ))}
            </select>
          </div>

          <label htmlFor="specialtyDropdown" className="col-sm-2 col-form-label">Specialty</label>
          <div className="col-sm-4">
            <select id="specialtyDropdown" className="form-select" value={selectedSpecialty} onChange={handleSpecialtyChange}>
              <option value="">-- Select --</option>
              {specialties.map((specialty) => (
                <option key={`${specialty}-${specialty}`} value={specialty}>{specialty.charAt(0).toUpperCase() + specialty.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="locationInput" className="col-sm-2 col-form-label">Location</label>
          <div className="col-sm-10">
            <input type="text" id="locationInput" className="form-control" name="location" value={location} onChange={handleLocationChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
