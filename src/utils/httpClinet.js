import axios from "axios";

const httpClient = axios.create({
  // baseURL: "http://localhost:9760/api/v1/", // local server
});

// Request interceptor
httpClient.interceptors.request.use(
  (request) => {
    // Do something with the request config (e.g., add headers, authentication token)
    // For example:
    let token = window.localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }

    request.headers["Authorization"] = `Bearer ${token}`;

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
