import axios from "axios";

const instance = axios.create({
    baseURL: 'https://designprosusa.com/Date_Night/api'
})



export default instance;