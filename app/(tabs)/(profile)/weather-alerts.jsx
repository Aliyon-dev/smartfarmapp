
import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import ProfileHeader from './ProfileHeader';
import styles from './styles';

const WeatherAlerts = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const recentAlerts = [
    {
      id: 1,
      icon: '🌧️',
      text: 'Heavy rain expected tomorrow',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      icon: '💨',
      text: 'Strong winds forecast for this evening',
      timestamp: '5 hours ago',
    },
    {
      id: 3,
      icon: '☀️',
      text: 'High UV index today',
      timestamp: '1 day ago',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ProfileHeader title="Weather Alerts" />
      <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notification Settings</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Enable Weather Alerts</Text>
          <Switch
            value={alertsEnabled}
            onValueChange={setAlertsEnabled}
            trackColor={{ false: '#e0e0e0', true: '#9be9a8' }}
            thumbColor={alertsEnabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
      </View>

      {alertsEnabled && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Alerts</Text>
          {recentAlerts.map((alert) => (
            <View key={alert.id} style={styles.alertItem}>
              <Text style={styles.alertIcon}>{alert.icon}</Text>
              <Text style={styles.alertText}>{alert.text}</Text>
              <Text style={styles.alertTimestamp}>{alert.timestamp}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Customize Alerts</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherAlerts;
