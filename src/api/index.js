import axios from 'axios';

const fetchApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export default fetchApi;