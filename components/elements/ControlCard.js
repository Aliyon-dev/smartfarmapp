import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Toggle } from './toggle'
import { useState } from 'react'
import { ScheduleModal } from './ScheduleModal'

export const ControlCard = ({name}) => {
    const [state, setState] = useState("off")
  return (
    <View style={styles.layout}>
        
        <Text style={styles.font}>{name}</Text>
        <View style={{flexDirection: 'row', gap: 12}}>
            <View><Toggle/></View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    layout:{
        flexDirection: 'row',
        backgroundColor:"#ffffff",
        borderRadius: 8,
        width: '100%',
        height: 72,
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    font:{
        fontSize: 16,
        fontWeight: '500',
        color: "#5D87FF"
    }
})

