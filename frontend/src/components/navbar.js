import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from "react-router-dom";

import homepagePic from '/frontend/public/homepage1.png'
import specialist from '/frontend/public/specialist.svg'
import clinic from '/frontend/public/clinic.svg'
import doctorCount from '/frontend/public/doctorCount.svg'


export default function NavBar({ user, login, logout}) {
   
  const navigate = useNavigate();
  
  const handleClicked = () => {
      navigate("/formbar");
  };
   
    
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/doctors" className="navbar-brand d-flex align-items-center">
        <img src="../logo.png"  width="" height="40" className="d-inline-block align-top mr-2" />
        HealthConnect
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {user ? (
              <button onClick={handleLogout} className="nav-link login-link">
                {user.name.split(" ")[0]}, Logout
              </button>
            ) : (
              <button onClick={login} className="nav-link login-link" style={{marginRight: "10px"}}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
    <div>
    <div className="container">
      <div className="container">
        <div className="col">
        <div className="row">
          <div className="col">
            <h1>Doctor Lookup</h1>
            <p>Find the best doctors in your area </p>
            <div
              style={{
                width: 213,
                height: 56,
                paddingLeft: 28,
                paddingRight: 28,
                paddingTop: 16,
                paddingBottom: 16,
                background:
                  'linear-gradient(96deg, #3A8EF6 0%, #6F3AFA 100%)',
                boxShadow: '0px 8px 23px rgba(65, 132, 247, 0.24)',
                borderRadius: 100,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 10,
                display: 'inline-flex'
              }}
            >
              <div
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 8,
                  display: 'flex'
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      position: 'relative',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      display: 'flex'
                    }}
                  >
                    <div style={{ width: 1.59, height: 3.83, background: 'white' }}></div>
                    <div style={{ width: 1.59, height: 3.83, background: 'white' }}></div>
                    <div style={{ width: 13.29, height: 11.61, background: 'white' }}></div>
                    <div style={{ width: 10.66, height: 12.07, background: 'white' }}></div>
                    <div style={{ width: 5, height: 5, background: 'white' }}></div>
                  </div>
                </div>
                <button
                  type='button'
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Sora',
                    fontWeight: '600',
                    wordWrap: 'break-word'
                  }}
                    onClick={handleClicked}
                >
                  Search Now
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="Object" style={{width: 487.12, height: 612.71, position: 'relative'}}>
                <img src={homepagePic} style={{width: 487.12, height: 612.71, left: 0, top: 0, position: 'absolute'}} />
            </div>
      </div>
      </div>
      </div>
    </div>





    <div className="container">
    <div className="Counters" style={{width: 1127, height: 210, position: 'relative'}}>
  <div className="Counter" style={{width: 349, height: 176, paddingTop: 11, left: 0, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
    <div className="Counter" style={{width: 349, height: 165, position: 'relative'}}>
      <div className="Counter" style={{width: 294, height: 103, left: 36, top: 0, position: 'absolute'}}>
        <div className="Group" style={{width: 115, height: 73.99, left: 0, top: 22.01, position: 'absolute'}}>
            <img className="Shape" style={{width: 115, height: 73.99, left: 0, top: 0, position: 'absolute'}} src={doctorCount} />
        </div>
        <div className="200" style={{width: 150, height: 56, left: 144, top: 0, position: 'absolute', color: '#357A38', fontSize: 48, fontFamily: 'Lato', fontWeight: '900', lineHeight: 56, wordWrap: 'break-word'}}>+1200</div>
        <div className="Doctors" style={{width: 150, height: 49, left: 144, top: 54, position: 'absolute', color: 'rgba(0, 0, 0, 0.87)', fontSize: 36, fontFamily: 'Lato', fontWeight: '700', lineHeight: 56, wordWrap: 'break-word'}}>Doctors</div>
      </div>
      <div className="MaecenasNislLibero" style={{width: 349, height: 54, left: 0, top: 111, position: 'absolute', textAlign: 'center', color: 'rgba(0, 0, 0, 0.87)', fontSize: 18, fontFamily: 'Lato', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'}}>Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam. </div>
    </div>
  </div>
  <div className="Counter" style={{width: 349, height: 193, left: 389, top: 17, position: 'absolute'}}>
    <div className="Counter" style={{width: 156, height: 93, left: 155, top: 0, position: 'absolute'}}>
      <div className="200" style={{width: 156, height: 53, left: 0, top: 0, position: 'absolute', color: '#357A38', fontSize: 48, fontFamily: 'Lato', fontWeight: '900', lineHeight: 56, wordWrap: 'break-word'}}>+1200</div>
      <div className="Clinics" style={{width: 150, height: 46, left: 0, top: 47, position: 'absolute', color: 'rgba(0, 0, 0, 0.87)', fontSize: 36, fontFamily: 'Lato', fontWeight: '700', lineHeight: 56, wordWrap: 'break-word'}}>Clinics</div>
    </div>
    <div className="MaecenasNislLibero" style={{width: 349, height: 88, left: 0, top: 105, position: 'absolute', textAlign: 'center', color: 'rgba(0, 0, 0, 0.87)', fontSize: 18, fontFamily: 'Lato', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'}}>Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam. </div>
    <div className="Group" style={{width: 84, height: 84, left: 55, top: 9, position: 'absolute'}}>
    <img className="Shape" style={{width: 115, height: 73.99, left: 0, top: 0, position: 'absolute'}} src={clinic} />
    </div>
  </div>
  <div className="Counter" style={{width: 349, height: 193, left: 778, top: 17, position: 'absolute'}}>
    <div className="Counter" style={{width: 158, height: 93, left: 160, top: 0, position: 'absolute'}}>
      <div className="100" style={{width: 122, height: 56, left: 0, top: 0, position: 'absolute', color: '#357A38', fontSize: 48, fontFamily: 'Lato', fontWeight: '900', lineHeight: 56, wordWrap: 'break-word'}}>+100</div>
      <div className="Specialist" style={{width: 158, height: 46, left: 0, top: 47, position: 'absolute', color: 'rgba(0, 0, 0, 0.87)', fontSize: 36, fontFamily: 'Lato', fontWeight: '700', lineHeight: 56, wordWrap: 'break-word'}}>Specialist</div>
    </div>
    <div className="MaecenasNislLibero" style={{width: 349, height: 88, left: 0, top: 105, position: 'absolute', textAlign: 'center', color: 'rgba(0, 0, 0, 0.87)', fontSize: 18, fontFamily: 'Lato', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'}}>Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam. </div>
    <div className="Group" style={{width: 81, height: 75, left: 59, top: 18, position: 'absolute'}}>
    <img className="Shape" style={{width: 115, height: 73.99, left: 0, top: 0, position: 'absolute'}} src={specialist} />
    </div>
  </div>
</div>
    </div>
    </div>
    </div>
    </div>
  );
  
}
