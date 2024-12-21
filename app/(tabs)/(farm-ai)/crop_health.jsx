import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../assets/styles'
import { useState } from 'react'
import LottieView from 'lottie-react-native'
import { useEffect } from 'react'
import axios from 'axios'
import { assess_farm } from '../../../hooks/apis'
import { AnimatedTyping } from '../../../components/elements/Writer'

const crop_health = () => {
  const [processing, setProcessing] = useState(false)
  const [statusMessage, setStatusMessage] = useState('Ready to assist you')
  const [aiMessage, setAiMessage] = useState("")

  const assess = async () => {
    try {
      setStatusMessage('Initializing...');
      const response = await assess_farm();
      if(response){
        console.log(response);
        setTimeout(() => {
          setStatusMessage('Reading sensor data...');
        }, 5000);
    
        setTimeout(() => {
          setStatusMessage('Analyzing data...');
        }, 10000);
    
        setTimeout(() => {
          setStatusMessage('Generating report...');
        }, 15000);
    
        setTimeout(() => {
          setStatusMessage('Assessment Done!');
          setProcessing(false);
        }, 20000);

        setTimeout(() => {
          setAiMessage(response);
        }, 21000);
      }
      else{
        setStatusMessage('Error Occurred');
        setProcessing(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while processing your request');
    }finally{
      setProcessing(false);
      setStatusMessage('Assesment Done ');
    }
  }


  return (
    <SafeAreaView style={[GlobalStyles.layout, {marginTop: 40, justifyContent:'flex-start'}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 16, backgroundColor: '#ffffff', borderRadius: 200}}>
        <View style={{flexDirection: 'row', gap: 12}}>
          <Image
          style={{width:56, height:56}}
          source={require('../../../assets/icons/terra.png')}
          resizeMode='contain'/>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 18, fontWeight:'600'}}>Terra.Ai</Text>
            <Text style={{fontSize: 12, color: '#401aff'}}>{statusMessage}</Text>
          </View>
        </View>

        <View style={{width: 56, height: 56, justifyContent:'center', alignItems:'center', borderRadius: 200}}>
              {processing?<LottieView
              source={require('../../../assets/loading.json')}
              speed={2}
              autoPlay={processing?true:false}
              loop={true}
              style={{width: 42, height: 42, borderRadius: 200}}
            />: 
            
            <TouchableOpacity 
              onPress={()=>{setProcessing(true), assess()}}>
              <Image
                resizeMode=''
                style={{width: 42, height: 42, borderRadius: 200}}
                source={require('../../../assets/icons/reload.png')}/>
              </TouchableOpacity>}
        </View>
      </View>
      {aiMessage?
      <View style={{backgroundColor: "white", borderRadius: 12, padding: 16, marginTop: 20, width: '100%', maxHeight: '75%'}}>
      <ScrollView style={{width: '100%'}}>
        <AnimatedTyping text = {[aiMessage]} text_color={"#72777A"} size={14}/>
        </ScrollView>
      </View>:null}
    </SafeAreaView>
  )
}

export default crop_health

const styles = StyleSheet.create({})