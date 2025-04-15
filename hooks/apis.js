import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://13.48.30.229:8001/api';

const api =  axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});


api.interceptors.request.use(
    async (config) =>{
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Token ${token}`
        }
        return config
    }, 
    (error)=>Promise.reject(error)
);

export const login =  async (email, password)=>{
    try{
        const response =  await axios.post('http://13.48.30.229:8001/api/auth/login', {email, password});
        const {token, user} = response.data;

        //store token
        await AsyncStorage.setItem('userToken', token)
        return {token, user};

    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getUser =  async () =>{
    try{
        const response =  await api.get('/auth/user');
        return response.data
    }
    catch(error){
        console.error(error)
        throw error;
    }
}

export const assess_farm = async ()=>{
    try{
        const response = await api.get('/ai/assess-farm')
        return response.data
    }
    catch(error){
        console.error(error)
        throw error;
    }
}


export const register =  async (user)=>{
    try{
        const response = await axios.post('http://13.48.30.229:8001/api/auth/register', {user});
        return response.data
    }
    catch(error){
        console.log(error)
        throw(error)
    }
}

/**
 * The function `weather` is an asynchronous function that fetches weather data for a specific location
 * using an API endpoint.
 * @param location - The `weather` function is an asynchronous function that takes a `location`
 * parameter. This function makes a GET request to a weather API endpoint with the provided `location`
 * to fetch weather data. If the request is successful, it returns the weather data. If there is an
 * error during the request,
 * @returns The `weather` function is returning the data received from the API call to
 * `http://13.48.30.229:8001/api/weather/getweather/`.
 */
export const weather = async (location)=>{
    try{
        
        const response = await axios.get(`http://13.48.30.229:8001/api/weather/getweather/${location}`);
        return response.data
    }
    catch(error){
        console.log(error)
        throw(error)
    }
}