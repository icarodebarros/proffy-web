import axios from 'axios';
import { environment } from '../environments/environment';

const api = axios.create({
    baseURL: environment.apiURL,
});

export default api;