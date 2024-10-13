import { View, Text, ScrollView, Image, TextInput, TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '../../components/elements/inputField'
import { styles } from '../../assets/styles'
import { Button } from '../../components/elements/Button'
import { CheckField } from '../../components/elements/CheckBox'
import {useState} from 'react'
import { ActivityIndicator } from 'react-native'
import axios from 'axios'
import { router } from 'expo-router'
import { UserContext } from '../../context/userContext'

const SignIn = () => {
    const {isLoading, userLogin} = useContext(UserContext)
    const [error, setError] = useState({})
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
      password:'',
      email: '',
    })



    const handleLogin = async ()=>{   
      try{
        const success = await userLogin(formData.email, formData.password)
        if(success){
        router.replace("/home")
        }
      }
      catch(error){
            alert(error)
      }
      finally{
      }
        
  };

    const validate =  ()=>{
      let valid =  true
      if(!formData.email){
        handleError('Please enter your email', 'email')
        valid = false
      }
      if(!formData.password){
        handleError('invalid password',  'password')
        valid = false
      }

      if(valid){
        handleLogin();
      }
    }


    const handleInput  = (field, value)=>{
      setFormData({...formData, [field]:value})
  }


    const handleError = (errorMessage, input)=>{
      setErrors(prevState=>({...prevState, [input]:errorMessage}))

    }




  return (
    <SafeAreaView className = "bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
        <View style={styles.flex}>
                <Image source={require('../../assets/logo.jpg')}/>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '800',
                    }}>Login Account</Text>
            </View>

            <View style={{gap:24}}>
                <View style={{gap:28}}>

                  <Input
                      label="Email" 
                      iconName="email"  
                      placeholder="Enter your email"
                      onChangeText = {(text)=>handleInput('email', text)}
                      value={formData.email}
                      error = {errors.email}
                      onFocus={()=>{
                          handleError(null, 'email')
                      }}
                    
                    />


                  <Input
                      password={true}
                      label="Password" 
                      iconName="lock"  
                      placeholder="Enter your password"
                      onChangeText = {(text)=>handleInput('password', text)}
                      value={formData.password}
                      error = {errors.password}
                      onFocus={()=>{
                          handleError(null, 'password')
                      }}
                    />

                </View>

                <Text style={{color: '#5D87FF'}}>
                    Forgot Password?    
                </Text>

                <Button
                  title="Login"
                  loading={isLoading}
                  onPress={validate}
                  />
                <View style={{flexDirection: 'row', justifyContent: 'center', gap: 4}}>
                    <Text style={{fontSize: 14}}>
                        Do not have an account?
                    </Text>
                    <TouchableOpacity style={styles.touch}>
                        <Text style={{color: '#5D87FF', fontWeight: '600' }}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 14, color: '#5D87FF'}}>Or</Text>
                </View>

                <View>
                    <Button
                    onPress =  {() => handlePress()}
                    source={require('../../assets/google.png')}
                    type={'secondary'}
                    title={'Sign in with Google'}
                    />
                </View>

                <View style={{top:24, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Terms | Policies</Text>
                </View>

            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn