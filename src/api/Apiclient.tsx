import axios, { AxiosResponse } from "axios";

export const port = "http://localhost:5000"

export const createAxios = axios.create({
    baseURL: port,
    headers: {
        'Content-Type': 'application/json'
    }
})
export const createAxiosForm = axios.create({
    baseURL: port,
    headers: {
        'Content-Type': 'application/form-data'
    }
})
createAxios.interceptors.response.use((response: AxiosResponse) => {
    if (response && response.data) {
        return response.data.data
    }
    return response
}, (error) => {
    throw error
})
createAxiosForm.interceptors.response.use((response: AxiosResponse) => {
    if (response && response.data) {
        return response.data
    }
    return response
}, (error) => {
    throw error
})