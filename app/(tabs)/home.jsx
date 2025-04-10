import { StyleSheet, Text, View, Image, ScrollView, Platform, PermissionsAndroid, ActivityIndicator} from 'react-native'
import { useEffect, useState } from 'react'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Weather } from '../../components/elements/Weather'
import { SensorCard } from '../../components/elements/sensor_card'
import { UserContext } from '../../context/userContext'
import { useWebSocket } from '../../context/WebSocketContext'



const home = () => {
  const [date, setDate] = useState()
  const [greeting, setGreeting] = useState("")
  const {user} =  useContext(UserContext)
  const {location} = useContext(UserContext)
  const {weatherdata} = useContext(UserContext)
  const [isLoading, setIsLoading] =  useState(false)
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [constate, setConState] = useState("slow")
  const [boxData, setBoxData] = useState({
    temp: '',
    humidity: '65',
    phosphorus: '',
    nitrogen: '',
    potassium: '',
    moisture: ''
  })

  useEffect(() => {
    const box = "BX0001"
    const ws = new WebSocket(`ws://13.48.30.229:8001/ws/sensor/${box}/`);
    ws.onopen = (e) => {
      console.log("connected")
    }

    ws.onmessage = (e) => {
      const parse = JSON.parse(e.data)
      const {data} =  parse
      const state =  data['state']
      console.log(state)

      if(state == 'initial'){
        const {temp, humidity, phosphorus, nitrogen, potassium, moisture} = data['data']['sensors']
        console.log(data)
        setBoxData({
          temp: temp,
          humidity: humidity,
          phosphorus: phosphorus,
          nitrogen: nitrogen,
          potassium: potassium,
          moisture: moisture
        })
      }
      else if(state=='update'){
        const [key, value] = Object.entries(data)[1]
        setBoxData(prev=>({...prev, [key]: value}))
      }

    }

    ws.onerror = (error) => {
      console.log(error)
    }
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setConState("Disconnected")
    }
  }, [])

  useEffect(() => {
    getDate()
    getGreeting()
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
                      {isLoading? <View style={{flexDirection: "row", alignContent:"center", justifyContent: "center"}}><ActivityIndicator size="large" color="fffff"/></View> :
                        <View>
                          <View style={styles.top_weather_section}>
                            <View>
                              <Text style={styles.date_text}>{location}{", "}{date}</Text>
                              <Text style={{color: 'white', fontSize: 40}}>{weatherdata.temp}</Text>
                            </View>

                            <View style={styles.clouds}>
                              <Weather
                              state={weatherdata.condition}
                              />
                            </View>
                          </View>

                          <View style={styles.bottom_weather_section}>
                            <View style={{borderBottomColor: 'white', borderBottomWidth: 1, marginVertical: 4}}></View>
                            <Text style={{fontSize: 12, color: 'white'}}>{weatherdata.description}</Text>
                          </View>
          
                        </View> }

                    </View>

              </View>

              {/* Sensor Section */}
              <View style={styles.sensor_section}>
                  <Text>
                    Sensor Data (Virginia Tobacco)
                  </Text>

                  <View style={styles.sensor_container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                          <SensorCard
                          title="Soil Temp"
                          value={boxData.temp}
                          source={require('../../assets/sensor/temp.png')}
                          />

                        <SensorCard
                          title="Nitrogen"
                          value={boxData.nitrogen}
                          source={require('../../assets/sensor/ph.png')}
                        />

                        <SensorCard
                          title="Potassium"
                          value={boxData.potassium}
                          source={require('../../assets/sensor/flow.png')}
                        />
                  </View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <SensorCard
                          title="Phosphorus"
                          value={boxData.phosphorus}
                          source={require('../../assets/sensor/tds.png')}
                        />

                          <SensorCard
                          title="Moisture"
                          value={boxData.moisture}
                          source={require('../../assets/sensor/temp.png')}
                        />

                        <SensorCard
                          title="Humidity"
                          value="65"
                          source={require('../../assets/sensor/NPK.png')}
                        />
                </View>


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
    height: 204,
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
    flexDirection: 'column',
    justifyContent: 'space-between',

  }

})