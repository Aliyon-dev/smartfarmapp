import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


export const Toggle = ({ onValueChange, initialValue = false }) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const [isTimer, setIsTimer] = useState(false)

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
        <Text style={styles.stateText}>{isEnabled ? 'On' : 'Off'}</Text>
      </View>
      <TouchableOpacity>
          {isTimer? <Image style={{width: 28, height: 28}} resizeMode='contain'  source={require('../../assets/icons/on.png')}/>: 
          <Image style={{width: 28, height: 28}} resizeMode='contain'  source={require('../../assets/icons/off.png')}/>}
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    gap: 20
  },
  switch: {
    marginRight: 10,
  },
  stateText: {
    fontSize: 18,
    marginRight: 10,
  },
});
