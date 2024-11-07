import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'

const farmlayout = () => {
  return (
    <>
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen
           name="assistant"
           options={{
             headerShown: false
           }} 
        />

        <Stack.Screen
            name="chat"
            options={{
                headerShown: false
            }}
        />

    </Stack>
    </>
  )
}

export default farmlayout



const styles = StyleSheet.create({})