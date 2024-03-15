import axios from 'axios';

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "92fe9bfe70744d26ad9caa14ba782877"
    }
})