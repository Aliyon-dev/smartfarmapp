import React, { createContext, useEffect, useState } from "react";
import { login, getUser } from "../hooks/apis";
export const UserContext = createContext(); 
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from 'react-native'
import { getWeather } from "../hooks/helperapi";

export const UserContextProvider = ({ children }) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Check for existing login session when the app starts
        checkWeatherStatus();
        checkLoginStatus();
    }, []);


    const checkWeatherStatus =  async () => {
        try{
            const weather = await getWeather();
        }
        catch(error){
            console.log(error);
        }
        
    }
    const checkLoginStatus = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                const userDetails = await getUser(token);
                setUser(userDetails);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const userLogin =  async (email, password) =>{
        setIsLoading(true);
        try {
            const { token, user } = await login(email, password);
            await AsyncStorage.setItem('userToken', token);
            setUser(user);
            setIsLoggedIn(true);
            return true;
        } catch (error) {
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = ()=>{


    }



    return (
        <UserContext.Provider value={{userLogin, isLoading, isLoggedIn, user, logout}}>
            {children}
        </UserContext.Provider>
    )


}
