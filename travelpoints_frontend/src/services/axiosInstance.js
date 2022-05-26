import axios from "axios";

const defaultHeaders = {
    "Content-Type": "application/json",
};

const defaultConfig = {
    baseURL: "http://localhost:8080/",
    headers: defaultHeaders,
};

const getAxiosInstance = () => {
    return axios.create(defaultConfig);
};

export default getAxiosInstance;
