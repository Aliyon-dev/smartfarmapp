import React, { createContext, useEffect, useState } from "react";
import { login, getUser, weather, getFields, getCrops, getField } from "../hooks/apis";
export const UserContext = createContext(); 
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from 'react-native'
import * as Location from 'expo-location'
import { initializeApi } from "../hooks/apis";
import {router} from 'expo-router'

export const UserContextProvider = ({ children }) =>{
    const [crops, setCrops] = useState([]);
    const [fields, setFields] = useState([]);
    const [userToken, setUserToken] = useState(null);
    const [csrfToken, setCsrftoken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState("")
    const [weatherdata, setWeatherData] = useState({
        temp: 0,
        humidity: 0,
        feelslike: 0,
        condition: "",
        description: "The weather is currently clear"
    })


    useEffect(() => {
        // Check for existing login session when the app starts
        //getToken();
        initializeApi();
        checkLoginStatus();
        checkWeatherStatus();
        fetchFields();
        fetchCrops();

    }, []);


    //get fields

    const fetchFields = async () => {
        try{
            const response = await getFields();
            setFields([...response.data]);
        }
        catch(error){
            console.log(error)
            return "unable to fields";
        }
    }

    const createFields = () =>{
    }


    //Get CSRF token
    const getCsrfToken = async () => {
        try{
            const response = await fetch('https://api.techiqsmart.farm/api/auth/get-csrf-token');
            if(response.ok){
                const data = await response.json();
                setCsrftoken(data.csrf_token);
                //console.log(data.csrf_token)
            }
            else{
                console.log("Error fetching CSRF token")
            }

        }
        catch(error){
            console.log(error)

        }

    }


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

        return {
            lat: currentLocation.coords.latitude,
            lon: currentLocation.coords.longitude
        }


        //const reverseGeocode = await Location.reverseGeocodeAsync({
        //    latitude: currentLocation.coords.latitude,
        //    longitude: currentLocation.coords.longitude
        //})
//
        //if(reverseGeocode.length > 0){
        //    return reverseGeocode[0].city
        //}
      }
      catch(error){
        console.log(error)
      }


    }


    const checkWeatherStatus =  async () => {
        try{
            const loc = await getLocation();
            console.log(loc)
            setLocation(location);
            const response = await weather(loc.lat, loc.lon);
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

    //const getToken = async () => {
    //    const token = await AsyncStorage.getItem('userToken');
    //    if(token){
    //        setUserToken(token);
    //        console.log(token)
    //    }
    //    else{
    //        console.log("No token found")
    //    }
    //}


    const checkLoginStatus = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                setUserToken(token)
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
            const userDetails = await getUser(token);
            setUser(userDetails);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
          // 1. Remove the token and wait for it to finish
          await AsyncStorage.removeItem('userToken');
          //setUser(null);
          // 3. Re-check login status (or redirect directly)
          await checkLoginStatus(); 
          router.replace('/sign-in')
      
          // 4. (Optional) If you’re using React Navigation, reset to the Auth stack:
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'Login' }],
          // });
        } catch (error) {
          console.error('Failed to logout:', error);
        } finally {
          // Always turn loading off
          setIsLoading(false);
        }
      };
      

    const fetchCrops = async () => {
        console.log()
        try{
            const response = await getCrops();
            setCrops([...response.data]);
            console.log(crops)
        }
        catch(error){
            console.log(error)
            return "unable to fields";
        }
    }


    const fetchField =  async (id) => {
        try{
            const response = await getField(id);
            if(response.status==="success"){
                console.log("field fetched successfully")   
                return response.data;
            }
        }
        catch(error){
            console.log(error)
            return "unable to fields";
        }
    }


    return (
        <UserContext.Provider value={{userLogin, isLoading, isLoggedIn, user, userToken, logout, location, weatherdata, fields, crops, refetch: fetchFields, fetchField}}>
            {children}
        </UserContext.Provider>
    )


}


