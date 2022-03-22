import axios from 'axios'

const baseUrl = 'http://8.130.167.227:3000'

const instance = axios.create({
    baseURL:baseUrl+'/ys',
})

instance.baseUrl = baseUrl;

export default instance;