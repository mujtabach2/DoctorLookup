/*global google*/
import { useEffect, useState } from 'react';
import DoctorDataService from '../services/doctor.js';
import { useGeocoding } from './geocoding.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import './doctor-list.css';




export default function DoctorList({ user, clientAddress, doctors }) {
  const [userData, setUserData] = useState(user);
  const [ratingChange, setRatingChange] = useState('');
  const [sortedDoctors, setSortedDoctors] = useState([]);
  const [reviewData, setReviewData] = useState({
    doctorId: '',
    review: '',
    user: '',
    date: '',
  });
  const [error, setError] = useState('');
  const [doctorRatings, setDoctorRatings] = useState({}); // New state for doctor ratings
  const [filterOption, setFilterOption] = useState('');
  const doctorDataService = new DoctorDataService();

  useGeocoding(clientAddress, doctors, setSortedDoctors);

  const [doctorReviews, setDoctorReviews] = useState({});

  const getDoctorReviews = async (doctorId) => {
    try {
      console.log('Fetching reviews for doctor:', doctorId);
      const response = await doctorDataService.getDoctorReviews(doctorId);
      console.log('Response:', response);
      console.log('Response data:', response.data);
  
      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid API response: Unexpected data format');
      }
  
      // Accessing the text of the first review in the response array
      const firstReviewText = response.data[0].text;
      console.log('First review text:', firstReviewText);
  
      // Store the reviews in state for the specified doctorId
      setDoctorReviews((prevReviews) => ({
        ...prevReviews,
        [doctorId]: response.data,
      }));
  
      return response.data;
    } catch (error) { 
      if (error.response && error.response.status === 404) {
        console.error('No reviews found for the specified doctor.');
      } else {
        console.error('Error fetching reviews for doctor:', error.message);
      }
      return []; // Return an empty array in case of an error or if no reviews are found
    }
  };

  useEffect(() => {
    async function updateUserRatingData(doctorId, userRating) {
      try {
        const existingRating = userData.ratings.find((item) => item.doctorId === doctorId);
      
        if (existingRating) {
          
          existingRating.ratingValue = userRating.toFixed(1);
        } else {
          // If the user hasn't rated this doctor before, add a new rating object
          userData.ratings.push({ doctorId, ratingValue: userRating.toFixed(1) });
        }

        // Update the user object with the new rating
        const updatedUser = {
          ...userData,
          ratings: [...userData.ratings], // Create a new array to trigger React state update
        };

        setUserData(updatedUser);

        // Persist the updated user ratings to the backend
        await doctorDataService.addRatingToUser(userData._id, doctorId, userRating);
        console.log('Rating added to the database successfully.');
      } catch (error) {
        console.error('Error adding rating to the database:', error);
        // Handle any error that occurred during the API call
      }
    }

    if (ratingChange !== '') {
      const { doctorId, userRating } = ratingChange;
      updateUserRatingData(doctorId, userRating);
      setRatingChange('');
    }
  }, [userData, ratingChange]);

 
  const getUserRatingForDoctor = (doctorId) => {
    const existingRating = userData.ratings.find((rating) => rating.doctorId === doctorId);
    return existingRating ? existingRating.ratingValue : null;
  };

  const handleChange = (e, doctorId) => {
    console.log('handleChange', e.target.value);
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      [doctorId]: {
        ...prevReviewData[doctorId], // Preserve the existing properties for the doctor
        review: e.target.value, // Set the review property within the object for the doctor
      },
    }));
  };
  
  const handleSubmit = async (e, doctorId) => {
    e.preventDefault();
    let reviewRating = 0;
    if (doctorRatings[doctorId])
    {
       reviewRating = doctorRatings[doctorId];
    }
    console.log()
    try {
      const response = await doctorDataService.createReview(doctorId, {
        review: reviewData[doctorId].review,
        date: new Date().toISOString(),
        user: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          rating: reviewRating,
          // Add any other user-related fields you want to include in the review
        },
      });
    

      console.log('Review created:', response);

      // Reset the form
      setReviewData((prevReviewData) => ({
        ...prevReviewData,
        [doctorId]: {
          review: '',
          user: '',
          date: '',
        },
      }));
      
      
      // Update the user's object with the rating information
      await handleRatingSubmit(doctorId, doctorRatings[doctorId]);

      // Update the sortedDoctors state with the newly created review
      const updatedSortedDoctors = sortedDoctors.map((doctor) => {
        if (doctor.id === doctorId) {
          return {
            ...doctor,
            reviews: [...doctor.reviews, response],
          };
        }
        return doctor;
      });

      setSortedDoctors(updatedSortedDoctors);

      // Log the user object after giving a rating
      console.log('User object after giving a rating:', user);
    } catch (error) {
      console.error('Error creating review:', error.message);
      setError('Error creating review. Please try again later.');
    }
  };

  useEffect(() => {
    const sortDoctorsByFilter = () => {
      switch (filterOption) {
        case 'highest_rating':
          setSortedDoctors((prevSortedDoctors) =>
            [...prevSortedDoctors].sort((a, b) => parseFloat(b.star) - parseFloat(a.star))
          );
          break;
        case 'closest_doctor':
          setSortedDoctors((prevSortedDoctors) =>
            [...prevSortedDoctors].sort((a, b) => a.distance - b.distance)
          );
          break;
        default:
          // If no filter option selected, retain the original order
          setSortedDoctors((prevSortedDoctors) => [...prevSortedDoctors]);
      }
    };

    // Call sortDoctorsByFilter whenever filterOption or sortedDoctors changes
    sortDoctorsByFilter();
  }, [filterOption, sortedDoctors]);

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };
  const handleRatingChange = (e, doctorId) => {

    const userRating = parseFloat(e.target.value);
    const originalRating = parseFloat(sortedDoctors.find((doctor) => doctor._id === doctorId)?.star);
  
    let combinedRating = originalRating;
  
    if (!isNaN(userRating)) {
      const weightOriginal = 0.7;
      const weightUser = 0.3;
      combinedRating = (originalRating * weightOriginal + userRating * weightUser).toFixed(1);
  
      // Update the doctorRatings object with the new rating
      setDoctorRatings((prevRatings) => ({
        ...prevRatings,
        [doctorId]: userRating,
      }));
  
      // Trigger the useEffect to update the user data and call the API
      setRatingChange({ doctorId, userRating });
  
      // Add the rating update to the database after the state is updated
      setSortedDoctors((prevDoctors) => {
        return prevDoctors.map((doctor) => {
          if (doctor._id === doctorId) {
            return { ...doctor, star: combinedRating };
          }
          return doctor;
        });
      });
    }
  };  

  const handleDelete = async (doctorId, reviewId) => {
    try {
      const response = await doctorDataService.deleteReview(reviewId);
      console.log('Review deleted:', response);
      // Remove the deleted review from the sortedDoctors state
      const updatedSortedDoctors = sortedDoctors.map((doctor) => {
        if (doctor.id === doctorId) {
          return {
            ...doctor,
            reviews: doctor.reviews.filter((review) => review._id !== reviewId),
          };
        }
        return doctor;
      });
      setSortedDoctors(updatedSortedDoctors);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  
  const handleUpdate = async (doctorId, reviewId, updatedReviewData) => {
    try {
      // dont update the review in the database add the updated review to the user object
      // in the database
      
      const response = await doctorDataService.updateReview(reviewId, updatedReviewData);
      console.log('Review updated:', response);
      // Update the sortedDoctors state with the updated review
      const updatedSortedDoctors = sortedDoctors.map((doctor) => {
        if (doctor.id === doctorId) {
          const updatedReviews = doctor.reviews.map((review) => {
            if (review._id === reviewId) {
              return response.data;
            }
            return review;
          });
          return {
            ...doctor,
            reviews: updatedReviews,
          };
        }
        return doctor;
      });
      setSortedDoctors(updatedSortedDoctors);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const StarRating = ({ rating }) => {
    return (
      <Stack spacing={1}>
        <Rating name="star-rating" value={rating} precision={0.5} readOnly />
      </Stack>
    );
  };

  const handleRatingSubmit = async (doctorId, rating) => {
    try {
      // Make the API request to update the user's rating

      //instead of this, we will push the rating to the database dont update 
      // add the rating to the user objects rating array
      await doctorDataService.updateUserRating(doctorId, rating); // Make sure you have implemented this function on the backend
    } catch (error) {
      console.error('Error updating user rating:', error);
    }
  };











  
  const [showReviewsPopup, setShowReviewsPopup] = useState(false);
  const [showReviewsMap, setShowReviewsMap] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Track the selected doctor for the reviews popup

  useEffect(() => {
    // Initialize the showReviewsMap state with default values for each doctor
    const defaultShowReviewsMap = {};
    doctors.forEach((doctor) => {
      defaultShowReviewsMap[doctor._id] = false;
    });
    setShowReviewsMap(defaultShowReviewsMap);

    // ... (previous code) ...
  }, [doctors]);

  const handleToggleShowReviews = async (doctorId) => {
    console.log('Toggle show reviews for doctor:', doctorId);
    // If reviews are already loaded for the doctor, simply toggle the visibility
    if (doctorReviews[doctorId]) {
      setShowReviewsMap((prevShowReviewsMap) => {
        const updatedShowReviewsMap = {
          ...prevShowReviewsMap,
          [doctorId]: !prevShowReviewsMap[doctorId],
        };
        return updatedShowReviewsMap;
      });
      setSelectedDoctor(doctorId);
      setShowReviewsPopup((prevShowReviewsPopup) => !prevShowReviewsPopup);
    } else {
      // If reviews are not loaded for the doctor, load them from the backend
      try {
        const reviews = await getDoctorReviews(doctorId);
        if (reviews.length > 0) {
          // Set the doctor reviews in the state if there are reviews available
          setDoctorReviews((prevDoctorReviews) => ({
            ...prevDoctorReviews,
            [doctorId]: reviews,
          }));
          // Set the visibility to true
          setShowReviewsMap((prevShowReviewsMap) => ({
            ...prevShowReviewsMap,
            [doctorId]: true,
          }));
          setSelectedDoctor(doctorId);
          setShowReviewsPopup(true);
        } else {
          // If there are no reviews, set the visibility to false
          setShowReviewsMap((prevShowReviewsMap) => ({
            ...prevShowReviewsMap,
            [doctorId]: false,
          }));
        }
      } catch (error) {
        console.error('Error loading reviews for doctor:', error);
      }
    }
  };
  
  

  // Function to toggle the popup visibility
  const togglePopup = () => {
    setShowPopup((prevShowPopup) => !prevShowPopup);
  };

 const toggleReviewsPopup = (event, doctorId) => {
  event.stopPropagation();
  setSelectedDoctor((prevSelectedDoctorId) => (prevSelectedDoctorId === doctorId ? null : doctorId));
  setShowReviewsPopup((prevShowReviewsPopup) => {
    const newShowReviewsPopup = !prevShowReviewsPopup;
    if (!newShowReviewsPopup) {
      // Reset the showReviewsMap state when closing the reviews
      setShowReviewsMap((prevShowReviewsMap) => ({
        ...prevShowReviewsMap,
        [doctorId]: false,
      }));
    }
    return newShowReviewsPopup;
  });
};


const renderDoctorReviews = (doctor) => {
 
  if (!doctorReviews[doctor._id] || !showReviewsMap[doctor._id]) {
    return null;
  }
  if (!doctors || !Array.isArray(doctors) || doctors.length === 0) {
    return <div>Error: No doctors available or invalid data.</div>;
  }

  return (
    <>
   
      {showReviewsPopup && selectedDoctor === doctor._id && (
        <div className={`modal-backdrop ${showPopup ? 'show-backdrop' : ''}`} onClick={togglePopup}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h3>{doctor.name} Reviews</h3>
                    <div className="review-list">
                      <ul className="list-group list-group-flush">
                        {doctorReviews[doctor._id].length !== 0  ? (
                          doctorReviews[doctor._id].map((review) =>
                            // Check if review.text is not empty before rendering the review
                            review.text && (
                              <li className="list-group-item" key={review._id}>
                                  <div className="review-header">
                                    <p className="review-name">{review.name}</p>
                                    {review.rating > 0 ? <StarRating rating={review.rating} /> : "No rating"}
                                  </div>
                                <p className="review-text">{review.text}</p>
                                <p className="review-date">{review.date}</p>
                              </li>
                            )
                          )
                        ) : (
                          <li className="list-group-item">No reviews</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Exit button to close the reviews popup */}
                <button className="btn btn-primary" onClick={(e) => toggleReviewsPopup(e, doctor._id)}>
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

  return (
    <div className="container-fluid">
      
      <div className="row">
        <div className="col-md-6">
          <div id="map" style={{ height: '700px' }}></div>
        </div>
        {/* ... (previous code) ... */}
        <div className="col-md-6">
        <div className="row" style={{ marginLeft: "10px", width: "95%", backgroundColor: 'lightgray', padding: '10px', marginBottom: '5px', borderRadius:" 70px", alignItems: 'center',justifyContent:"center" }}>
          <div className="col-md-2">
            <label htmlFor="filterDropdown" className="form-label">
              <strong>Filter By:</strong>
            </label>
          </div>
          <div className="col-md-8">
            <select
              id="filterDropdown"
              className="form-select"
              value={filterOption}
              onChange={handleFilterChange}
            >
              <option value="">None</option>
              <option value="highest_rating">Highest Rating</option>
              <option value="closest_doctor">Closest Doctor</option>
            </select>
          </div>
        </div>
          <div style={{ maxHeight: '700px', overflowY: 'scroll' }}>
            {/* Loop through the sortedDoctors array and render each doctor */}
            {sortedDoctors.map((doctor) => (
              <div key={doctor.id} id={`doctor-${doctor._id}`} className="card mb-3">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                  {/* Display the doctor's image */}
                  <img
                    className="card-img-top"
                    src={doctor.imgUrl}
                    alt="Card image cap"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div className="card-body">
                  {/* Display the doctor's name and specialty */}
                  <h5 className="card-title">{doctor.name}</h5>
                  <h3 className="card-text">{doctor.specialty}</h3>
                </div>
                <ul className="list-group list-group-flush">
                  {/* Only show the following line if the user object is not null */}
                 
                    <li className="list-group-item">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {user && (
                        <span style={{ marginRight: '10px', color: 'green' }}>
                          Your Rating: {getUserRatingForDoctor(doctor._id) || (doctorRatings[doctor._id] ? doctorRatings[doctor._id].toFixed(1) : 'N/A')}
                        </span>
                        )}
                        {/* Display the rating stars and current average rating */}
                        <Rating
                          name={`rating-${doctor._id}`}
                          value={parseFloat(doctor.star)}
                          precision={0.5}
                          onChange={(event) => handleRatingChange(event, doctor._id)}
                        />
                        <span style={{ marginLeft: '10px' }}>
                          {parseFloat(doctor.star).toFixed(1)}
                        </span>
                      </div>
                    </li>
                  
                </ul>
                <li className="list-group-item">{doctor.address}</li>
                <p>Distance: {doctor.distance ? doctor.distance.toFixed(2) : 'N/A'} miles</p>
                {renderDoctorReviews(doctor)} 
                <button
                      className="btn btn-primary"
                      onClick={(e) => {
                       handleToggleShowReviews(doctor._id)
                        //toggleReviewsPopup(e, doctor._id);
                      }}
                      style={{ marginBottom: '10px' }}
                    >
                     {showReviewsPopup ? "Hide Reviews" : "Show Reviews"}
                    </button >
                {/* Review section */}
                {user ? (
                  <>
                    {/* Display doctor reviews */}
                    {/* //{renderDoctorReviews(doctor)}  */}
  
                   
  
                     {/* Review form for logged-in users */}
                  <form onSubmit={(e) => handleSubmit(e, doctor._id)}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="review"
                        value={reviewData[doctor._id]?.review} 
                        onChange={(e) => handleChange(e, doctor._id)} 
                        placeholder="Enter review"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </form>
                </>
              ) : (
                // Show a login popup when the user is not logged in and tries to add a review
                <a href="https://doctorlook.onrender.com/api/v1/doctors/login">
                  <button className="btn btn-primary" href>
                    Add Review (Log in required)
                  </button>
                </a>

              )}
              {/* Button to show all reviews for a doctor */}
             
              {/* Button to show all reviews for all doctors */}
             
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
