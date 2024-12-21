import { StyleSheet, Text, View, Image, ScrollView, Platform, PermissionsAndroid} from 'react-native'
import { useEffect, useState } from 'react'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Weather } from '../../components/elements/Weather'
import { SensorCard } from '../../components/elements/sensor_card'
import { UserContext } from '../../context/userContext'
import * as Location from 'expo-location'

const home = () => {
  const [date, setDate] = useState()
  const [greeting, setGreeting] = useState("")
  const [location, setLocation] = useState("")



  useEffect(() => {
    getDate()
    getGreeting()
    getLocation()
  }, [])


  const getGreeting = () => {
    let time = new Date().getHours()

    if(time < 12){
      setGreeting("Good Morning")
    }else if(time < 18){
      setGreeting("Good Afternoon")
    }else{
      setGreeting("Good Evening")
    }
  }
  
  const getDate = () => {
    new_date = new Date().toDateString()
    setDate(new_date)
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


      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      })

      if(reverseGeocode.length > 0){
        setLocation(reverseGeocode[0].city)
   

      }
    }
    catch(error){
      console.log(error)
    }


  }

  const {user} =  useContext(UserContext)
  console.log(user.data.first_name)
  return (
    <SafeAreaView style={{height: '100%', padding: 16}}>
      <ScrollView>
        <View style={styles.layout}>
              {/*  topBar */}
              <View style={styles.intro}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <Image
                    style={{height: 56, width: 56}}
                    source={require('../../assets/images/avatar.png')}
                    />

                    <View style={{marginLeft: 10}}> 
                    <Text style={{fontSize: 12}}>
                        {greeting}
                    </Text>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                        {user.data.first_name} {user.data.last_name}
                    </Text>
                </View>
                </View>

                <View style={{marginLeft: 100}}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/icons/alarm.png')}
                      style={{width:38, height:38}}
                      />
                </View>
              </View>
              
              {/* Weather Section */}
              <View style={styles.weather_section}>
                    <Text>
                        Weather Today
                    </Text>
                    <View style={styles.weather_container}>
                      <View style={styles.top_weather_section}>
                        <View>
                          <Text style={styles.date_text}>{location}{", "}{date}</Text>
                          <Text style={{color: 'white', fontSize: 40}}>28 C</Text>
                        </View>

                        <View style={styles.clouds}>
                          <Weather
                          state="windy"
                          />
                        </View>

                      </View>

                  

                      <View style={styles.bottom_weather_section}>
                        <View style={{borderBottomColor: 'white', borderBottomWidth: 1, marginVertical: 10}}></View>
                        <Text style={{fontSize: 12, color: 'white'}}>Today water your plants in the evening</Text>

                      </View>


                    </View>

              </View>

              {/* Sensor Section */}
              <View style={styles.sensor_section}>
                  <Text>
                    Sensor Data
                  </Text>

                  <View style={styles.sensor_container}>
                    <SensorCard
                    title="Box Temp"
                    value="2°C"
                    source={require('../../assets/sensor/temp.png')}
                    />

                  <SensorCard
                    title="pH sensor"
                    value="10.0"
                    source={require('../../assets/sensor/ph.png')}
                  />

                  <SensorCard
                    title="water flow"
                    value="Low"
                    source={require('../../assets/sensor/flow.png')}
                  />

                  <SensorCard
                    title="TDS"
                    value="78%"
                    source={require('../../assets/sensor/tds.png')}
                  />

                    <SensorCard
                    title="water temp"
                    value="20°C"
                    source={require('../../assets/sensor/temp.png')}
                  />

                  <SensorCard
                    title="NPK sensor"
                    value="10.0"
                    source={require('../../assets/sensor/NPK.png')}
                  />
                  </View>
                  
                
              </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({

  layout:{
    gap: 24,
   
    

  },
  intro:{
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 22,
    paddingTop: 22,
    height: 100,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  weather_section:{
    gap:12,
    flexDirection: 'column'

  },
  weather_container:{
    backgroundColor:"#7FA0FF",
    height: 180,
    borderRadius: 21,
    padding: 16,
    flexDirection: 'column',
    gap: 12
  },
  clouds:{
  },
  top_weather_section:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  date_text:{
    color: "white",
    fontSize: 14,
  },
  bottom_weather_section:{
    flexDirection: 'column'
  },

  sensor_section:{
    gap: 12,
    flexDirection: 'column'
  },

  sensor_container:{
    height: 320,
    backgroundColor: '#ffffff',
    borderRadius: 21,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  }

})