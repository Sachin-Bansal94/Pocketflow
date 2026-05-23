import axios from "axios";

const API = axios.create({
    baseURL: "https://pocketflow-5nux.onrender.com"
});

export default API;