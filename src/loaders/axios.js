import axios from "axios";

async function getAxiosInstance() {

    // Create an Axios axiosInstance
    const axiosInstance = axios.create();

    // Add a request interceptor
    axiosInstance.interceptors.request.use((config) => {
      // Attach a timestamp to the request config
      config.metadata = { startTime: new Date() };
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    // Add a response interceptor
    axiosInstance.interceptors.response.use((response) => {
      // Calculate the response time
      const endTime = new Date();
      const startTime = response.config.metadata.startTime;
      const duration = endTime - startTime;

      // Attach the response time to the response object
      response.responseTime = duration;

      return response;
    }, (error) => {
      return Promise.reject(error);
    });

    return axiosInstance;
}

const axiosInstance = await getAxiosInstance();

export default axiosInstance;