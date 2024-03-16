import axios from 'axios';

export interface FetchResponse<T> {
    count: number;
    results: T[];
}

const apiClient = axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "92fe9bfe70744d26ad9caa14ba782877"
    }
})

export default apiClient

export class APIClient<T> {
    endpoint: string

    constructor (endpoint: string) {
        this.endpoint = endpoint
    }

    get = () => {
        return apiClient.get<T[]>(this.endpoint).then(res => res.data)
    }

    post = () => {
        return apiClient.post<T>(this.endpoint).then(res => res.data)
    }
}