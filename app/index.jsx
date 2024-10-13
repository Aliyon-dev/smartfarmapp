import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import {Link, Redirect, router} from 'expo-router'
import { Registration } from '../components/screens/Registration';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/logo.png'
import LottieView  from 'lottie-react-native'
import intro from '../assets/intro.json'
import { Button } from '../components/elements/Button';
import useFonts from '../hooks/useFont';
import {UserContext} from '../context/userContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react'
import { getUser } from '../hooks/apis';
import { ActivityIndicator } from 'react-native';

 



export default function App() {
  const fontsLoaded = useFonts();
  const {isLoading, isLoggedIn} =  useContext(UserContext)
  console.log(isLoading, "peace", isLoggedIn)

  if(isLoading){
    return(
       <View style={{justifyContent: 'center', alignItems:'center', marginTop: 400}}>
         <ActivityIndicator size="large"  color="#0000ff" />
       </View>
    )
  }

  if(!isLoading && isLoggedIn) return  <Redirect href="/home" />;


  
  return (
    <SafeAreaView style = {styles.container} >
      <ScrollView>
        <View>
          <Image  
            source={require('../assets/images/welcome.png')}
            style={{width: 327, height: 327}}/>
        </View>

        <View style={styles.text_container}>
          <Text style={styles.intro_text}>
            Empowering Farmers with Technology
          </Text>
          <Text style={styles.description}>
          with AI insights and real-time monitoring. Start smarter farming today! 🚜
          </Text>
        </View>


        <View style={{marginTop: 32, gap: 16}}>
          <Button
            title="Sign Up"
            onPress={()=> router.push('/sign-up')}
          />
          <Button
            title="Login"
            type='secondary'
            onPress={()=> router.push('/sign-in')}

          />
        </View>

        <View style={{marginTop: 14}}>
          <Text style={styles.footer_text}>Join the future of farming with our AI-powered solutions. 🌱🚀 T&Cs apply.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:' 100%',
    width: '100%',

  },

  image:{
    width: 48,
    height:48
  },
  lottieAnimation:{
    width: 350,
    height: 350,
  },
  intro_text:{
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'opensans',
    textAlign: 'center'

  },

  description:{
    fontSize: 14,
    textAlign: 'center',
    color: '#838383',
    fontWeight: '300'
  },
  
  text_container:{
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#838383'
  },
  footer_text:{
    fontSize: 10,
    color: "#7E848D"
  }


});
