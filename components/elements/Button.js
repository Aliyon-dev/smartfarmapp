import {TouchableOpacity, Text, Image, useAnimatedValue, StyleSheet} from 'react-native'
import { useState } from 'react'
import { ActivityIndicator } from 'react-native'



export const Button =  ({title, type ='primary', source, onPress=()=>{}, loading, ...props}) =>{
    const BtnStyle = () =>{
        switch (type) {
            case 'primary':
                return styles.primary_btn
            case 'secondary':
                return styles.secondary_btn
            default:
                return styles.primary_btn
        }
    }
    
    const BtnText = () =>{
        switch (type) {
            case 'primary':
                return styles.primary_btn_text
            case 'secondary':
                return styles.secondary_btn_text
            default:
                return styles.primary_btn_text
        }
    }
    const [isLoading, setIsLoading] = useState(loading)


    return(
        <TouchableOpacity
        onPress={()=>{
            onPress()
        }}
        style={BtnStyle()}>
            {source && <Image source={source} style={styles.icon}/>}

            {loading?(
                <ActivityIndicator size="small" color="#0000ff" />
            ): <Text style={BtnText()}>{title}</Text>}
            
        </TouchableOpacity>
    )
  
}


export const styles =  StyleSheet.create({
    
    primary_btn:{
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: '#5D87FF',
        paddingVertical: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        fontWeight: '500',
        height: 56,
        borderRadius: 8,
    },

    secondary_btn:{
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        fontWeight: '500',
        height: 56,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C4C7C7',
    },

    primary_btn_text:{
        color:'white',
        fontWeight: '500',
        fontSize: 16,
    },

    disabled_btn:{
        backgroundColor: '#C4C7C7',
    },

    secondary_btn_text:{
        color:'#191C1D',
        fontWeight: '500',
        fontSize: 16,
    },

})
