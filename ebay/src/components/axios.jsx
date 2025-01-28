import axios from "axios";
//https://react-ecommerce-website.000webhostapp.com/Api
//http://localhost/Api

export default axios.create({
    baseURL: 'http://localhost:9091/'
});