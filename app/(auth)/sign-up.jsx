import {View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, Keyboard, Modal, ScrollView} from 'react-native'
import {Input} from '../../components/elements/inputField'
import { Button } from '../../components/elements/Button'
import { CheckField } from '../../components/elements/CheckBox'
import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import axios from 'axios'
import { useCallback } from 'react'
import { CenteredModal } from '../../components/elements/success'
import {Link} from 'expo-linking'
import { StyleSheet } from 'react-native'
import { router } from 'expo-router'

const SignUp = () =>{
    const [formData, setFormData] = useState({
        box_id:'',
        password:'',
        first_name:'',
        last_name:'',
        email:'',
        phone:'',
        state:'',
        country:'',
    })

    const [terms, setTerms] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [blank, setBlank] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [errors, setErrors] = useState({})
    const [isTaken, setIsTaken] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)


    const handleInput  = (field, value)=>{
        setFormData({...formData, [field]:value})
    }

    const handleError = (errorMessage, input)=>{
        setErrors(prevState=>({...prevState, [input]:errorMessage}))

    }


    const changeStep = useCallback((newStep) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setStep(newStep);
            setIsTransitioning(false);
        }, 500); // 500ms delay, adjust as needed
    }, []);


    const submitForm = async ()=>{
        setIsLoading(true)
        try{
            axios.post('https://smartfarmapi.pythonanywhere.com/api/auth/register', formData)
            .then(response=>{
                console.log(response.status)
                setModalVisible(true)
            })
            .catch(error=>{
                Alert.alert("alert", error.reponse.data.message)
                console.log(error.response)
            })
        }
        catch(error){

        }
        finally{
            setIsLoading(false)
        }

    }


    const handleNextStep = ()=>{
        console.log(step)
        if(step===1){
            changeStep(2)
        }
        else if(step===2){
            changeStep(3)
        }
    }

    const handlePrevStep = ()=>{
        changeStep(step-1)
    }
 

const validate = ()=>{
    Keyboard.dismiss();
    let valid = true

    switch(step){
        case 1:

            if(formData.password.length < 6){
                handleError('password must be at least 6 characters long', 'password')
            }

            if(!formData.box_id || formData.box_id.length < 6){
                handleError('Box ID must be 6 character long', 'box_id')
                }

            else if(formData.box_id &&  formData.box_id.length >=6 && formData.password.length > 6){
                setIsLoading(true)
                console.log(formData.box_id)
                axios.get(`https://smartfarmapi.pythonanywhere.com/api/auth/get-box/${formData.box_id}`)
                .then(response =>{
                    data = response.data
                    setIsLoading(false)
                    if(data.data.isTaken == true){

                        handleError(`box with id ${formData.box_id} is taken`, 'box_id')
                    }
                    else{
                        handleNextStep()
                    }
                })
                .catch(error=>{
                    console.log('this is the error:', error)
                    valid = false
                    setIsLoading(false)
                    handleError(error)
                })
            }

        case 2:
            if(!formData.first_name){
                handleError('please enter your first name', 'first_name')
                return
            }

            if(!formData.last_name){
                handleError('please enter your last name', 'last_name')
                return 
            }

            if(!formData.email){
                handleError('please enter email', 'email')
                return
            }else if(!formData.email.match(/\S+@\S+\.\S+/)){
                handleError('please enter a valid email', 'email')
                return
            }
            handleNextStep()

        case 3:
            if(!formData.phone){
                handleError('please enter your phone number', 'phone')
                return
            }
            if(formData.phone.length < 13){
                handleError('phone number  must be 12 digits long', 'phone')
            }
            else if(!formData.phone.match(/^\+260\s?\d{9}$/)){
                handleError('Phone number must start with "+260"', 'phone')
                return
            }
                

            if(!formData.country){
                handleError('please select country', 'country')
                return
            }

            if(!formData.state){
                handleError('please select state or province', 'state')
                return
            }

            submitForm();
    }

}




const renderStep = () =>{
    
        if (isTransitioning) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#5D87FF" />
                </View>
            );
        }

        switch(step){
            case 1:
                return(
                    <SafeAreaView style={{gap:24, backgroundColor: "#ffffff"}}>
                        <View style={{gap: 28}}>
                            <Input 
                                label="Box ID" 
                                iconName="barcode"  
                                placeholder="Enter your Box ID"
                                onChangeText = {(text)=>handleInput('box_id', text)}
                                value={formData.box_id}
                                error = {errors.box_id}
                                onFocus={()=>{
                                    handleError(null, 'box_id')
                                }}
       
                            />

                            <Input
                                password={true}
                                label=" Create Password"
                                iconName="lock"
                                placeholder="create password"
                                onChangeText={(text) => handleInput('password', text)}
                                value={formData.password}
                                error = {errors.password}
                                onFocus={()=>{
                                    handleError(null, 'password')
                                }}
                            />
                    
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start',}}>
                            <CheckField label={'I have read and agree to our Terms of Use and             Privacy Policy'}/>
                        </View>
                    
                        <View>
                            <Button
                                title="Create Account"
                                loading={isLoading}
                                onPress={validate}
                            />
                        </View>
                                
                        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 4}}>
                            <Text style={{fontSize: 14}}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity style={styles.touch}
                            onPress={()=>{router.push('/sign-in')}}>
                                <Text style={{color: '#5D87FF', fontWeight: '600' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                                
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 14, color: '#5D87FF'}}>Or</Text>
                        </View>
                                
                        <View>
                            <Button
                                title="Sign up with Google"
                                type='secondary'
                                source={require('../../assets/google.png')}

                                />
                        </View>
                    </SafeAreaView>
                )
                
            case 2:
                return(
                    <SafeAreaView style={{gap:40}}>
                        <View style={{gap: 28}}>
                            <Input
                                password={false}
                                label="First Name"
                                iconName="account"
                                placeholder="Enter your first name"
                                onChangeText={(text) => handleInput('first_name', text)}
                                value={formData.first_name}
                                error = {errors.first_name}
                                onFocus={()=>{
                                    handleError(null, 'first_name')
                                }}
                            />  
                            <Input
                                password={false}
                                label="Last Name"
                                iconName="account"
                                placeholder="Enter your last name"
                                onChangeText={(text) => handleInput('last_name', text)}
                                value={formData.last_name}
                                error = {errors.last_name}
                                onFocus={()=>{
                                    handleError(null, 'last_name')
                                }}
                            />  
                            <Input
                                password={false}
                                label="Email"
                                iconName="email"
                                placeholder="Enter your email"
                                onChangeText={(text) => handleInput('email', text)}
                                value={formData.email}
                                error = {errors.email}
                                onFocus={()=>{
                                    handleError(null, 'email')
                                }}
                            />  
                    
                    </View>
    
                    <View style={{gap:24}}>
                            <Button
                                title="Next Step"
                                loading={isLoading}
                                onPress={validate}
                            />

                            <Button
                                title="previous step"
                                loading={false}
                                type='secondary'
                                onPress={handlePrevStep}
                            />          
                    </View>
                </SafeAreaView>
                )
            
            case 3:
                return(            
                <SafeAreaView style={{gap:40}}>
                    <View style={{gap: 28}}>
                            <Input
                                password={false}
                                label="phone number"
                                iconName="phone"
                                placeholder="Enter your phone number"
                                onChangeText={(text) => handleInput('phone', text)}
                                value={formData.phone}
                                error = {errors.phone}
                                onFocus={()=>{
                                    handleError(null, 'phone')
                                }}
                            />  

                            <Input
                                password={false}
                                label="Country"
                                iconName="map"
                                placeholder="Select your country"
                                onChangeText={(text) => handleInput('country', text)}
                                value={formData.country}
                                error = {errors.country}
                                onFocus={()=>{
                                    handleError(null, 'country')
                                }}
                            /> 

                            <Input
                                password={false}
                                label="state"
                                iconName="map-marker"
                                placeholder="Select state"
                                onChangeText={(text) => handleInput('state', text)}
                                value={formData.state}
                                error = {errors.state}
                                onFocus={()=>{
                                    handleError(null, 'state')
                                }}
                            /> 

                </View>

                <View style={{gap:24}}>
                    <Button
                        title="Finish registration"
                        loading={isLoading}
                        onPress={validate}
                    />

                    <Button
                        title="Previous step"
                        onPress={handlePrevStep}
                        type='secondary'
                    />
                </View>
            </SafeAreaView>)
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView>
            <View className="p-4">
            <CenteredModal
                title="Testing"
                visible={modalVisible}
                modalWidth = "90%"
                modalHeight = {300}
                onPress={()=> router.push('/sign-in')}

            />
            <View style={styles.flex}>
                <Image source={require('../../assets/logo.jpg')}/>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '800',
                    }}>Create an Account</Text>
                <Text style={styles.footer}>Join the future of farming with our AI-powered solutions.</Text>
            </View>
            <View style={{marginTop: 20}}>
            {/* input fields  */}
            {renderStep()}

            </View>

            </View>
          </ScrollView>

        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({

safeArea:{
    height: '100%',
    backgroundColor: 'white',
    padding: 16,
},
  layout:{
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    gap: 12,
    backgroundColor: "#ffffff"
},

flex:{
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
},
  footer:{
    marginTop: 8,
    fontSize: 16,
    color: '#747778',
    textAlign: 'center'
  },
})


export default SignUp