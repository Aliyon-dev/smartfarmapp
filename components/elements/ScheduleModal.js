import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'

export const ScheduleModal = ({
  visible,
  onClose = ()=>{},
  onPress = ()=>{}

}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >

      <View style={styles.layout}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Schedule Controls</Text>
        </View>
          
      </View>

    </Modal>
  )
}

const styles = StyleSheet.create({
  layout:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView:{
    width: 330,
    height: '75%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title:{
    color: '#5D87FF',
    fontSize: 16,
    fontWeight: '600'
  }
})