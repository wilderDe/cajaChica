import axios from "axios";


const cajaChicaApi = axios.create({
    baseURL: "http://localhost:8080/api"
})

export default cajaChicaApi