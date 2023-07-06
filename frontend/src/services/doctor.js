import http from "../http-common";


export default class DoctorDataService {
    getAll() {
        return http.get(`/doc`);
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

    createReview(data) {
        return http.post("/review", data);
    }


    updateReview(data) {
        return http.post("/review", data);
    }

    deleteReview(id, userId) {
        return http.delete(`/review?id=${id}`, { data: { user_id: userId } });
    }

    getCities() {
        return http.get("/cities");
    }
    getTypes() {
        return http.get("/types");
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
