import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const CheckField= ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => setIsChecked(!isChecked)}
    >
      <View style={[styles.checkbox, isChecked && styles.checked]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#747778',
    marginRight: 10,
    borderRadius:3,
  },
  checked: {
    backgroundColor: '#5D87FF',
    borderColor: '#5D87FF',
  },
  label: {
    fontSize: 12,
  },
});
