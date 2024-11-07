import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Button } from '../../components/elements/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, router } from 'expo-router'

const Profile = () => {
  const logout = ()=>{
    AsyncStorage.removeItem('userToken')
    console.log(AsyncStorage.getItem('userToken')) 
  }
  return (
    <SafeAreaView>
        <View>
      <Text>Profile</Text>
      <Button
      title="Logout"
      onPress={logout}/>
      
    </View>
    </SafeAreaView>
  )
}

export default Profile