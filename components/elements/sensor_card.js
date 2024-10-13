import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export const SensorCard = ({title,  value, source}) => {

  return (
    <View style={{alignItems: 'center', marginBottom: 30}}>
        <View style={styles.layout}>
            <Image

                style={{width: 24, height: 24}}
                resizeMode="contain"
                source={source}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#707070'}}>{value}</Text>

        </View>
      <Text style={{fontWeight:'medium'}}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    layout:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        width: 100,
        height: 100,
        backgroundColor: '#F5F7FA',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D0D4DA'
    }
})