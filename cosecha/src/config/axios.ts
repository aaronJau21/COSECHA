import axios from "axios";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    headers: {
        'Accept': 'application/json',
        'x-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

export default httpClient