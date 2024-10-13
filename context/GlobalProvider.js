import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, logout, getUser } from '../hooks/apis'; // Assuming you have these API functions

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing login session when the app starts
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            console.log(token)
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

    const loginUser = async (email, password) => {
        //console.log("fuck")
        //setIsLoading(true);
        try {
            const { token, user } = await login(email, password);
            await AsyncStorage.setItem('userToken', token);
            setUser(user);
            setIsLoggedIn(true);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logoutUser = async () => {
        setIsLoading(true);
        try {
            //await logout(); // Assuming this function exists in your API
            await AsyncStorage.removeItem('userToken');
            setUser(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            isLoading,
            loginUser,
            logoutUser
        }}>
            {children}
        </GlobalContext.Provider>
    );
};