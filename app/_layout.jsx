import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Slot, Stack} from 'expo-router'
import { GlobalProvider } from '../context/GlobalProvider'
import { UserContextProvider } from '../context/userContext'
import "../global.css";

const RootLayout = () => {
  return (
      <UserContextProvider>
        <Stack >
          <Stack.Screen name="index" options={{headerShown: false, backgroundColor:"#ffffff"}}/>
          <Stack.Screen name="(auth)" options={{headerShown: false, backgroundColor:"#ffffff"}}/>
          <Stack.Screen name="(tabs)" options={{headerShown: false, backgroundColor:"#F8F8FF"}}/>
        </Stack>
      </UserContextProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})