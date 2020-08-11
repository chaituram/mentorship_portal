import axios from "axios";

const instance = axios.create ({
    baseURL: 'https://mentor-ship-portal.firebaseio.com/'
})

export default instance; 