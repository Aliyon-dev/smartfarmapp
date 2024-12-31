import { View, Text, SafeAreaView, StyleSheet, Image} from 'react-native'
import React from 'react'
import { ControlCard } from '../../components/elements/ControlCard'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'

const Controls= () => {
  const {weatherdata} = useContext(UserContext)
  const {user} = useContext(UserContext)
  console.log(user)
  
  return (
    <SafeAreaView className="bg-grey h-full  p-4">
      <View style={styles.layout}>

        {/* top part  of the controls */}

        <View style={styles.details}>
          <View style={styles.innerDetails}>
            {/* left part */}
            <View>
              <Text>ID: {user.data.box_id.box_id}</Text>
              <View>
                <Text style={{color: "#5D87FF", fontSize: 36, fontWeight:'medium'}}>{weatherdata.temp}</Text>
              </View>

              <Text> feels like {weatherdata.feelslike}</Text>

            </View>


            {/* right part */}
            <View style={{justifyContent: 'flex-end', alignItems:'flex-end'}}>
              <View style={{flexDirection: "row", gap: 12, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Image resizeMode='contain' style={styles.icons} source={require("../../assets/icons/wifi.png")}/>
                <Image resizeMode='contain' style={styles.icons} source={require("../../assets/icons/power.png")}/>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Image style={{width:32, height:32}} resizeMode='contain' source={require("../../assets/icons/humidity.png")}/>
                <Text style={{color: "#5D87FF", fontSize: 36, fontWeight:'medium'}}>{weatherdata.humidity}</Text>
              </View>
              
              <View style={{justifyContent: 'flex-end'}}>
                <Text>Humidity</Text>
              </View>


            </View>
            

          </View>

          <View style={{padding: 16, gap:12}}>
              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={styles.smalltext}>Min: 20°C</Text>
                <Text style={styles.smalltext}>Max: 20°C</Text>
              </View>

              <View style={{flexDirection:'row', justifyContent: 'space-between', }}>
                <Text style={styles.smalltext}>1:29 AM </Text>
                <View  style={{flexDirection: 'row', alignItems: 'center', gap:1}}>
                  <Image style={{width: 24, height: 24}} resizeMode='contain' source={require("../../assets/icons/reload.png")}/>
                  <Text style={styles.smalltext}>Updated: 5mins ago</Text>
                </View>
              </View>
          </View>
        </View>
        {/*end*/}

         {/*controls*/}
         <View style={{gap: 12}} >
          <Text>Controls</Text>
          <View style={styles.controls}>
            <ControlCard
              name="Pump 1" 
            />

            <ControlCard
              name="Pump 2" 
            />

            <ControlCard
              name="Pump 3" 
            />  

            <ControlCard
              name="Pump 4" 
            />  

            <ControlCard
              name="Pump 5" 
            />  

    
               

          </View>
       

         </View>

      </View>
    </SafeAreaView>
  )
}

export default Controls

export const styles = StyleSheet.create({
  layout:{
    padding: 16,
    gap: 24
  },
  details:{
    marginTop: 52,
    height: 250,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    

  },
  innerDetails:{
    backgroundColor:"#ECF1FF",
    height: 150,
    padding:16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,

  }, 
  icons:{
    width: 24,
    height: 24,
  },

  smalltext:{
    color: '#BABABA'
  }, 
  controls:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 12
  }


})