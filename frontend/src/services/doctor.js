import http from "../http-common";


export default class DoctorDataService {
    getDoctors(params) {
        return http.get(`/doc`, { params });
    }
    async getDoctorReviews(doctorId) {
      try {
        // Make an API call to fetch the reviews for the specified doctor from the backend
        const response = await http.get(`/review/${doctorId}`);
        console.log('response:', response);
        return response // Assuming the API response contains the 'reviews' array
      } catch (error) {
        console.error('Error fetching reviews for doctor:', error);
        return []; // Return an empty array in case of an error or if no reviews are found
      }
    }
  
    get(id) {
        return http.get(`/id/${id}`);
    }

    create(data) {
        return http.post("/doctors", data);
    }

    findByTitle(title) {
        return http.get(`/doctors?title=${title}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }
    addRatingToUser(userId, doctorId, ratingValue) {
      const data = {
        userId: userId,
        doctorId: doctorId,
        ratingValue: ratingValue,
      };
  
      return http.post("/user/addRating", data)
        .then((response) => response.data)
        .catch((error) => {
          throw new Error('Error adding rating to user:', error);
        });
    }

    createReview(doctorId, reviewData) {
      const data = {
        doctorId: doctorId,
        review: reviewData.review,
        user: reviewData.user,
        date: reviewData.date,
      };
    
      return http.post('/review', data)
        .then((response) => response.data)
        .catch((error) => {
          throw new Error('Error creating review:', error);
        });
    }
    
      
      
      updateReview(data) {
        return http.put(`/review/${data.reviewId}/${data.userId}`, data);
      }
      
      deleteReview(reviewId, userId) {
        return http.delete(`/review/${reviewId}/${userId}`);
      }
      

    getCities() {
        return http.get("/cities");
    }
    getTypes() {
        return http.get("/types");
    }

    async updateUserRating(doctorId, rating) {
      try {
        const response = await fetch(`/rating/${doctorId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating }),
        });
        return await response.json();
      } catch (error) {
        console.error('Error updating user rating:', error);
        throw error;
      }
    }


    // async findByLocation(location) {
    //     try {
    //       // Make an API call to your backend to geocode the location
    //       const geocodeResult = await http.get(`/geocode?location=${location}`);
    
    //       // Extract the latitude and longitude from the geocode result
    //       const { lat, lng } = geocodeResult.data;
    
    //       // Make the API call to your server with the latitude and longitude parameters
    //       return http.get(`/doctors?lat=${lat}&lng=${lng}`);
    //     } catch (error) {
    //       throw new Error("Error retrieving doctors by location");
    //     }
    //   }
    }
