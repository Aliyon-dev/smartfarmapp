import React, { createContext, useEffect, useState } from "react";
import { login, getUser, weather } from "../hooks/apis";
export const UserContext = createContext(); 
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from 'react-native'
import * as Location from 'expo-location'

export const UserContextProvider = ({ children }) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState("")
    const [weatherdata, setWeatherData] = useState({
        temp: 0,
        humidity: 0,
        feelslike: 0,
        condition: "",
        description: ""
    })


    useEffect(() => {
        // Check for existing login session when the app starts
        checkLoginStatus();
        checkWeatherStatus();
    }, []);

    const getLocation = async () => {
      try{
        const {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
          console.log("Permission to access location was denied")
          return
        }

        const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High
        });


        const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
        })

        if(reverseGeocode.length > 0){
            return reverseGeocode[0].city
        }
      }
      catch(error){
        console.log(error)
      }


    }


    const checkWeatherStatus =  async () => {
        try{
            const my_location = await getLocation();
            setLocation(my_location);
            const response = await weather(my_location);
            setWeatherData({
                temp: response.data.current.temp,
                humidity: response.data.current.humidity,
                feelslike: response.data.current.feelslike,
                condition: response.data.current.condition,
                description: response.data.current.description
            })
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
        <UserContext.Provider value={{userLogin, isLoading, isLoggedIn, user, logout, location, weatherdata}}>
            {children}
        </UserContext.Provider>
    )


}


