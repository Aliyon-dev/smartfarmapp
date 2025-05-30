import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api.techiqsmart.farm/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

// Request interceptor for authentication token
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        
        // Add CSRF token if available
        const csrfToken = await AsyncStorage.getItem('csrfToken');
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        
        return config;
    }, 
    (error) => Promise.reject(error)
);

/**
 * Fetches a CSRF token from the server and stores it in AsyncStorage
 * @returns {Promise<string|null>} The CSRF token or null if there was an error
 */
export const getCsrfToken = async () => {
    try {
        const response = await axios.get(`${API_URL}api/auth/get-csrf-token`);
        
        if (response.data && response.data.csrf_token) {
            const csrfToken = response.data.csrf_token;
            await AsyncStorage.setItem('csrfToken', csrfToken);
            console.log('CSRF token fetched and stored');
            return csrfToken;
        } else {
            console.log("Error: CSRF token not found in response");
            return null;
        }
    } catch (error) {
        console.log("Error fetching CSRF token:", error);
        throw error;
    }
};

/**
 * Initialize API with CSRF token
 * Call this function at app startup to ensure CSRF protection
 */
export const initializeApi = async () => {
    try {
        await getCsrfToken();
    } catch (error) {
        console.error("Failed to initialize API with CSRF token:", error);
    }
};

export const login = async (email, password) => {
    try {
        // Ensure we have a CSRF token before login
        await getCsrfToken();
        
        const response = await axios.post(`${API_URL}api/auth/login`, {email, password}, {
            headers: {
                'X-CSRFToken': await AsyncStorage.getItem('csrfToken')
            }
        });
        
        const {token, user} = response.data;

        // Store token
        await AsyncStorage.setItem('userToken', token);
        return {token, user};
    } catch (error) {
        console.log("Login error:", error);
        throw error;
    }
};

export const getUser = async () => {
    try {
        const response = await api.get('api/auth/user');
        return response.data;
    } catch (error) {
        console.error("Get user error:", error);
        throw error;
    }
};

export const assess_farm = async () => {
    try {
        const response = await api.get('api/ai/assess-farm');
        return response.data;
    } catch (error) {
        console.error("Assess farm error:", error);
        throw error;
    }
};

export const register = async (user) => {
    console.log("Registering user:", user);
    try {
        // Ensure we have a CSRF token before registration
        await getCsrfToken();
        const response = await api.post('api/auth/register', user);
        return response.data;
    } catch (error) {
        console.log("Registration error:", error.response.data);
        throw error;
    }
};

/**
 * Fetches weather data for a specific location
 * @param {string} location - The location to get weather data for
 * @returns {Promise<Object>} The weather data
 */
export const weather = async (lat, lon) => {
    try {
        console.log("Fetching weather data for:", lat, lon);
        const response = await api.get(`api/weather/getweather/?lat=${lat}&lon=${lon}`);
        console.log("Weather data fetched:", response.data);
        return response.data;
    } catch (error) {
        console.log("Weather fetch error:", error);
        throw error;
    }
};


export const getFields = async () => {
    try {
        const response = await api.get('api/auth/get-fields');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createField = async (field) => {
    try {
        const response = await api.post('api/auth/create-field', field);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCrops = async () => {
    try {
        const response = await api.get('api/auth/get-crops');
        return response.data
      
    } catch (error) {
        throw error;
    }
}


export const verifyBox = async (box) => {
    try {
        const response = await api.post('api/auth/verify-box', {"box_id": box});
        return response.data;
    } catch (error) {
        console.log(error.response.data)
        return error;
    }
}


export const getField = async (fieldId) => {
    console.log("Fetching field data for ID:", fieldId);
    try {
        const response = await api.get(`api/auth/get-field?id=${fieldId}`);
        console.log("Field data fetched:", response.data);  
        return response.data;
       
    } catch (error) {
        console.error("Error fetching field data:", error);
        throw error;
    }
};