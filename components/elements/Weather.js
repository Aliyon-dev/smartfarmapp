import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import rainy from '../../assets/clouds/raining.png'
import sunny from '../../assets/clouds/sunny.png'
import cloudy from '../../assets/clouds/cloudy.png'
import windy from '../../assets//clouds/windy.png'
import {useState} from 'react'



export const Weather = ({cycle='day', state='sunny'}) => {
  const [condition, setCondition] =  useState('')

 const renderCloud = ()=>{
  switch(state){
    case 'sunny':
      return(
        <View style={styles.layout}>
          <Image
          resizeMode = "contain"
          style={styles.image} 
          source={sunny}/>
          <Text style={styles.text}>{state}</Text>
        </View>
      )
    case 'cloudy':
      return(
        <View style={styles.layout}>
          <Image
          resizeMode = "contain"
          style={styles.image} 
          source={cloudy}/>
          <Text style={styles.text}>{state}</Text>
        </View>
      )
    case 'windy':
      return(
        <View style={styles.layout}>
          <Image 
          resizeMode = "contain"
          style={styles.image} 
          source={windy}/>
          <Text style={styles.text}>{state}</Text>
        </View>
      )
    case 'rainy':
      return(
        <View style={styles.layout}>
          <Image 
          resizeMode = "contain"
          style={styles.image} 
          source={rainy}/>
          <Text style={styles.text}>{state}</Text>
        </View>
      )
    default:
      return(
        <View style={styles.layout}>
          <Image 
          resizeMode="contain"
          style={styles.image} 
          source={sunny}/>
          <Text style={styles.text}>{state}</Text>
        </View>
        
      )
  }

 }

  return (
    <View>
      {renderCloud()}
    </View>
  )
}


const styles = StyleSheet.create({
  layout:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,

  },
  image:{
    width: 160,
    height: 90,
  },
  text:{
    fontSize: 12,
    fontWeight: '600',
    color: "white"
  }
})