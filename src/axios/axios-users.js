import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://thoughtcloudanthon.firebaseio.com/users/',
});

export default instance;