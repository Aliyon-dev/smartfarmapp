
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ProfileHeader from './ProfileHeader';
import styles from './styles';

const CropCalendar = () => {
  const events = [
    {
      id: 1,
      title: 'Planting',
      date: '2025-07-20',
      icon: '🌱',
    },
    {
      id: 2,
      title: 'Harvesting',
      date: '2025-08-15',
      icon: '🌾',
    },
  ];

  const markedDates = {};
  events.forEach((event) => {
    markedDates[event.date] = { marked: true, dotColor: '#4CAF50' };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ProfileHeader title="Crop Calendar" />
      <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Crop Calendar</Text>
        <Calendar markedDates={markedDates} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Events</Text>
        {events.map((event) => (
          <View key={event.id} style={styles.event}>
            <Text style={styles.eventIcon}>{event.icon}</Text>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add New Event</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CropCalendar;
