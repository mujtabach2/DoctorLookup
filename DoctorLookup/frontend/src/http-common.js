import axios from "axios";

export default axios.create({
    baseURL: "https://doctorlook.onrender.com/api/v1/doctors",
    headers: {
        "Content-type": "application/json"
    }
});