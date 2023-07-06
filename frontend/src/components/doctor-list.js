// import React, { useState, useEffect } from "react";
// import DoctorDataService from "../services/doctor.js";
// import { Link } from "react-router-dom";
// import { Map, Marker } from "map.js";

// const DoctorList = (props) => {
//   const [doctors, setDoctors] = useState([]);
//   const [searchName, setSearchName] = useState("");
//   const [searchCity, setSearchCity] = useState("");
//   const [searchType, setSearchType] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");
//   const [type, setType] = useState(["All Types"]);
//   const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

//   useEffect(() => {
//     retrieveDoctors();
//     retrieveTypes();
//   }, []);

//   const onChangeSearchName = (e) => {
//     const searchName = e.target.value;
//     setSearchName(searchName);
//   };

//   const onChangeSearchCity = (e) => {
//     const searchCity = e.target.value;
//     setSearchCity(searchCity);
//   };

//   const onChangeSearchType = (e) => {
//     const searchType = e.target.value;
//     setSearchType(searchType);
//   };

//   const onChangeSearchLocation = (e) => {
//     const searchLocation = e.target.value;
//     setSearchLocation(searchLocation);
//   };

//   const retrieveDoctors = () => {
//     DoctorDataService.getAll()
//       .then((response) => {
//         console.log(response.data);
//         setDoctors(response.data.doctors);
//         setMapCenter({ lat: response.data.latitude, lng: response.data.longitude });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const retrieveTypes = () => {
//     DoctorDataService.getTypes()
//       .then((response) => {
//         console.log(response.data);
//         setType(["All Types"].concat(response.data));
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const refreshList = () => {
//     retrieveDoctors();
//   };

//   const find = (query, by) => {
//     DoctorDataService.find(query, by)
//       .then((response) => {
//         console.log(response.data);
//         setDoctors(response.data.doctors);
//         setMapCenter({ lat: response.data.latitude, lng: response.data.longitude });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const findByName = () => {
//     find(searchName, "name");
//   };

//   const findByCity = () => {
//     find(searchCity, "city");
//   };

//   const findByType = () => {
//     if (searchType === "All Types") {
//       refreshList();
//     } else {
//       find(searchType, "type");
//     }
//   };

//   return (
//     <div className="App">
//       <Map
//         google={window.google}
//         style={{ width: "100%", height: "400px" }}
//         initialCenter={mapCenter}
//         zoom={10}
//       >
//         {doctors.map((doctor) => (
//           <Marker
//             key={doctor.id}
//             position={{ lat: doctor.latitude, lng: doctor.longitude }}
//             name={doctor.name}
//           />
//         ))}
//       </Map>
//       {doctors.map((doctor) => {
//         return (
//           <div key={doctor.id}>
//             <img className="card-img-top" src={doctor.imgUrl} alt="Card image cap" />
//             <div className="card" style={{ width: "18rem" }}>
//               <div className="card-body">
//                 <h5 className="card-title">{doctor.name}</h5>
//                 <h3 className="card-text">{doctor.specialty}</h3>
//               </div>
//               <ul className="list-group list-group-flush">
//                 <li className="list-group-item">{doctor.star}</li>
//                 <li className="list-group-item">{doctor.address}</li>
//                 <li className="list-group-item">{doctor.reviews}</li>
//               </ul>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default DoctorList;
