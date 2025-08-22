import axios from "axios";

const httpClient = axios.create({
  // baseURL: "http://44.195.125.80:9760/api/v1/office", // company server
  baseURL: "https://nrl4s91s-9760.inc1.devtunnels.ms/api/v1/office", // local server
  // baseURL: "http://localhost:9760/api/v1/office", // local server
});

// Request interceptor
httpClient.interceptors.request.use(
  (request) => {
    // Do something with the request config (e.g., add headers, authentication token)
    // For example:
    // request.headers['Authorization'] = 'Bearer sfsdfsdf';
    let token = window.localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }

    // console.log("token => ", token);

    request.headers["Authorization"] = `Bearer ${token}`;
    // console.log('token => ', `Bearer ${token}`)
    // console.log("request interceptors", token);

    return request;
  },  
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Do something with the response error (e.g., error handling, logging)
    return Promise.reject(error);
  }
);

export default httpClient;
