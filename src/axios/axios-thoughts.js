import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://thoughtcloudanthon.firebaseio.com/thoughts/',
});

export default instance;