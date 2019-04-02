import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'

export default axios.create({
    baseURL: BASE_URL

});