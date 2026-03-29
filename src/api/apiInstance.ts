import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://easydev.club/api/v1',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})