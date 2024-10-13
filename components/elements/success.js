import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const CenteredModal = ({ 
    visible, 
    onClose=()=>{},
    onPress=()=>{}, 
    title, 
    children,
    modalWidth = '50%',
    modalHeight = '',
    modalMaxHeight = '80%'

}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {width: 360, height:500}]}>
        <View style={styles.lottieContainer}>
              <LottieView
                source={require('../../assets/success.json')}
                autoPlay
                loop={false}
                style={styles.lottieAnimation}
              />
            </View>
          <Text style={styles.modalTitle}>Account created successfully!</Text>
          {children}
          <TouchableOpacity style={styles.closeButton} onPress={()=>{
            onPress();
          }}>
            <Text style={styles.closeButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
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
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    width:250,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: '500',
    height: 56,
    borderRadius: 8,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lottieContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  }
});
