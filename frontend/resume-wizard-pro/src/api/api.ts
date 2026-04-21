import axios from "axios";

export const api = axios.create({
    baseURL:"https://resume-saas-1ajp.onrender.com/",
    withCredentials:true
})
