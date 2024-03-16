import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
    count: number;
    results: T[];
}

const axiosInstance = axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "92fe9bfe70744d26ad9caa14ba782877"
    }
})
export default class APIClient<T> {
    private endpoint: string

    constructor (endpoint: string) {
        this.endpoint = endpoint
    }

    get = (config?: AxiosRequestConfig) => {
        return axiosInstance.get<FetchResponse<T>>(this.endpoint, config).then(res => res.data)
    }

    post = () => {
        return axiosInstance.post<FetchResponse<T>>(this.endpoint).then(res => res.data)
    }
}