import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://16.171.23.214:8000/api';

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
        const response =  await axios.post('http://16.171.23.214:8000/api/auth/login', {email, password});
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
        const response = await axios.post('http://16.171.23.214:8000/api/auth/register', {user});
        return response.data
    }
    catch(error){
        console.log(error)
        throw(error)
    }
}

export const weather = async (location)=>{
    console.log(location)
    try{
        const response = await axios.get(`http://16.171.23.214:8000/api/weather/getweather/${location}`);
        return response.data
    }
    catch(error){
        console.log(error)
        throw(error)
    }
}