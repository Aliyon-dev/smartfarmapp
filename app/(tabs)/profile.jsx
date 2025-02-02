import { View, Text, SafeAreaView, ActivityIndicator, Image, StyleSheet} from 'react-native'
import {  } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { Button } from '../../components/elements/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, router } from 'expo-router'
import { UserContext } from '../../context/userContext'
import {Input} from '../../components/elements/inputField'

const Profile = () => {
  const [loading, setLoading] =  useState(false);
  

  const logout =  async ()=>{
    try{
      setLoading(true)
      await AsyncStorage.removeItem('token')
      setTimeout(()=>{
        setLoading(false);
        router.push('/sign-in')
      }, 100)
    }
    catch(error){
      console.log(error)
    }
  }

  const data ={name: 'aliyon'}
  return (

    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>

        <View style={{justifyContent:'center', alignItems:'center', width:'100%', marginTop: 52}}>
          <Image style={{width: 100, height: 100}} source={require('../../assets/images/avatar.png')}/>
          <Text>My name</Text>
          <View style={{width: '100%', gap: 12}}>

            <View style={{flexDirection: 'column',width: '100%', marginTop: 20, gap: 10}}>
              <Text style={{color: '#8A8C8F', fontWeight: '600'}}>Field type</Text>
              <View style={{width: '100%', height: 64, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems:'flex-start', padding: 16, borderRadius: 12}}>
                <Text>Data</Text>
              </View>
            </View>

            <View style={{flexDirection: 'column',width: '100%', marginTop: 20, gap: 10}}>
              <Text style={{color: '#8A8C8F', fontWeight: '600'}}>Field type</Text>
              <View style={{width: '100%', height: 64, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems:'flex-start', padding: 16, borderRadius: 12}}>
                <Text>Data</Text>
              </View>
            </View>


          </View>

        </View>

        <View style={{width: '100%'}}>
          <Button
            type="secondary"
            title="Logout"
            onPress={logout}
            source={require("../../assets/icons/logout.png")}

            />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    height: '100%',
    padding: 16,
    paddingBottom: 24,
    paddingTop: 24,

  },
  content:{
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor:'',
    marginVertical: 20
  }

})