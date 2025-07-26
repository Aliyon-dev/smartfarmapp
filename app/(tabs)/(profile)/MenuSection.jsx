
import React from 'react';
import { View } from 'react-native';
import styles from './main-style';

const MenuSection = ({ children }) => (
  <View style={styles.menuSection}>
    {children}
  </View>
);

export default MenuSection;
