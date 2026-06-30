import axios from "axios";
/*
  Axios instance (central API configuration)
  - Base URL stored once
  - Interceptors can be added later (auth, logging, etc.)
*/
const axiosClient =axios.create({
    baseURL : "https://dummyjson.com",
    headers:{
        "Content-Type": "application/json",
    }
})

export default axiosClient;