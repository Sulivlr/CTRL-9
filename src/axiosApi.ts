import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://last-dance-46d2d-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;