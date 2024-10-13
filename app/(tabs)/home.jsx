import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Weather } from '../../components/elements/Weather'
import { SensorCard } from '../../components/elements/sensor_card'
import { UserContext } from '../../context/userContext'

const home = () => {
  const {user} =  useContext(UserContext)
  console.log(user)
  return (
    <SafeAreaView className="bg-grey h-full  p-4">
      <ScrollView>
        <View style={styles.layout}>
              {/*  topBar */}
              <View style={styles.intro}>
                <View>
                    <Image
                    style={{height: 56, width: 56}}
                    source={require('../../assets/images/avatar.png')}
                    />
                </View>
                <View style={{marginLeft: 10}}> 
                    <Text style={{fontSize: 12}}>
                        Good Afternoon
                    </Text>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                        {user.data.email}
                    </Text>
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
                          <Text style={styles.date_text}>Lusaka 10 OCT 2024</Text>
                          <Text style={{color: 'white', fontSize: 40}}>28 C</Text>
                        </View>
                      </View>

                      <View style={styles.clouds}>
                          <Weather
                          state="windy"
                          />

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
    position: 'absolute',
    left: 220,
  },
  top_weather_section:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

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