
import React from 'react';
import { TouchableOpacity, View, Text, Switch } from 'react-native';
import styles from './main-style';

const MenuItem = ({ icon, title, subtitle, isSwitch, onSwitchChange, switchValue, onPress, warning }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      <Text style={[styles.menuIcon, styles.iconGreen]}>{icon}</Text>
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    {isSwitch ? (
      <Switch
        trackColor={{ false: "#e0e0e0", true: "#9be9a8" }}
        thumbColor={switchValue ? "#4CAF50" : "#f4f3f4"}
        ios_backgroundColor="#e0e0e0"
        onValueChange={onSwitchChange}
        value={switchValue}
      />
    ) : (
      <View style={styles.menuAction}>
        {warning && <Text style={styles.warningIcon}>⚠️</Text>}
        <Text style={styles.chevron}>›</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default MenuItem;
