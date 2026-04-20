import axios from "axios";

export const api = axios.create({
    baseURL:"http://192.168.31.118:5000/",
    withCredentials:true
})
