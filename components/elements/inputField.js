import {View, Text, TextInput} from 'react-native'
import { styles } from '../../assets/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'


export const Input = ({
    label, 
    iconName,
    error,
    password,
    onFocus=()=>{},
    ...props 

    }) => {
    
    const[isFocused, setIsFocused] = useState(false)
    const[hidePassword, setHidePassword] = useState(password)
    return(
        <View>
            <Text style={[styles.input_title, {marginBottom: 12}]}>{label}</Text>
            <View style={[
                styles.inputContainer, 
                {
                    borderColor: 
                        error? 
                            "#ff0000"
                        :isFocused?
                            "#007bff"
                        :"#ccc"
                    }
                ]}>
                <Icon name={iconName} style={{fontSize:22, color: "#D3D3D3"}}/>
                <TextInput
                    secureTextEntry={hidePassword}
                    onFocus = {()=>{
                        onFocus()
                        setIsFocused(true)
                    }}

                    onBlur={()=>{
                        setIsFocused(false)
                    }}
                    style={{marginLeft: 10, height: 56}} 
                    {...props} 
                    />

               {password && 
               (<Icon 
                    name={hidePassword? "eye":  "eye-off"}
                    style={{fontSize: 22, color: "#D3D3D3", marginLeft: 120}}
                    onPress={()=>{
                        setHidePassword(!hidePassword)
                    }}
                    />
                )}
                
            </View>
            {error &&
            (<Text style={{color: "#ff0000", fontSize: 13}}>{error}</Text>)}
        </View>
    )

}

