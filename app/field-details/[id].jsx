// app/fields/[fieldId].js

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  StatusBar
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { SensorCard } from '../../components/elements/sensor_card'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function FieldScreen() {
  const {id} = useLocalSearchParams();
  const { fetchField } = useContext(UserContext);
  const [boxData, setBoxData] = useState({
      temp: '',
      humidity: '65',
      phosphorus: '',
      nitrogen: '',
      potassium: '',
      moisture: ''
    })
  const [fieldName, setFieldName] = useState('');


    useEffect(() => {
      getfield();

    }, []);
    

    // Fetch field data when component mounts
    const getfield = async () => {
      try{
        const response =  await fetchField(id);
        setFieldName(response.field_name);
      }
      catch(error){
        console.error("Error fetching field data:", error);
      }

      }

  const router = useRouter();
  const fieldId = '123'; // Placeholder for fieldId, replace with actual logic

  return (
    <>
      {/* Configure this screen’s header */}
      <Stack.Screen
        options={{
          title:fieldName || 'Field Details',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#fff', fontSize: 16 },
          headerTintColor: '#333',
          headerBackTitleStyle:{
            fontSize: 12,
            color: '#333',
          }
        }}
      />

      {/* Main UI */}
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Header Row (redundant with native header, can be removed) */}
        
        <ScrollView style={styles.scrollView}>
          {/* Crops Section */}

          
          {/* Crop Card */}
          <View style={styles.card}>
            <View style={styles.cropHeader}>
              <View style={styles.cropInfo}>
                <Image 
                  source={require('../../assets/avocado.png')} 
                  style={styles.cropImage}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.cropName}>{fieldName}</Text>
                  <Text style={styles.cropVariety}>Hass</Text>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Good</Text>
              </View>
            </View>
            
            <View style={styles.cropDetails}>
              <View>
                <View style={styles.plantedRow}>
                  <Text style={styles.plantedBullet}>•</Text>
                  <Text style={styles.plantedText}>Planted: March 15, 2024</Text>
                </View>
                <Text style={styles.daysAgo}>441 days ago</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Sensor Readings */}
                <View style={styles.sensor_container}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <SensorCard
                        title="Soil Temp"
                        value={boxData.temp}
                        source={require('../../assets/sensor/temp.png')}
                        />
          
                      <SensorCard
                        title="Nitrogen"
                        value={boxData.nitrogen}
                        source={require('../../assets/sensor/ph.png')}
                      />
          
                      <SensorCard
                        title="Potassium"
                        value={boxData.potassium}
                        source={require('../../assets/sensor/flow.png')}
                      />
                </View>
          
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                      <SensorCard
                        title="Phosphorus"
                        value={boxData.phosphorus}
                        source={require('../../assets/sensor/tds.png')}
                      />
          
                        <SensorCard
                        title="Moisture"
                        value={boxData.moisture}
                        source={require('../../assets/sensor/temp.png')}
                      />
          
                      <SensorCard
                        title="Humidity"
                        value="65"
                        source={require('../../assets/sensor/NPK.png')}
                      />
                </View>
          </View>
          
          {/* Action Buttons */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', padding: 16,
    backgroundColor: '#fff', borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: { fontSize: 20, fontWeight: '500' },
  headerButton: { fontSize: 16, color: '#333' },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: '500', color: '#333' },
  addButton: {
    width: 60, height: 40, borderRadius: 20,
    backgroundColor: '#22c55e', alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  card: {
    backgroundColor: '#fff', borderRadius: 12,
    padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2, elevation: 2,
  },
  cropHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cropInfo: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  cropImage: { width: 40, height: 40, resizeMode: 'contain' },
  cropName: { fontSize: 18, fontWeight: '500' },
  cropVariety: { fontSize: 14, color: '#666' },
  statusBadge: {
    backgroundColor: '#22c55e', paddingHorizontal: 12,
    paddingVertical: 4, borderRadius: 20,
  },
  statusText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  cropDetails: {
    marginTop: 8, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  plantedRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  plantedBullet: { fontSize: 12, color: '#666', marginRight: 6 },
  plantedText: { color: '#666', fontSize: 14 },
  daysAgo: { color: '#666', fontSize: 12, marginTop: 4 },
  cardTitle: { fontSize: 18, fontWeight: '500', marginBottom: 4 },
  lastUpdated: { fontSize: 12, color: '#666', marginBottom: 16 },
  sensorGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    marginBottom: 16, gap: 12,
  },
  sensorItem: {
    backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8,
  },
  halfWidth: { width: '48%' },
  thirdWidth: { width: '31%' },
  sensorLabel: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 4,
  },
  sensorEmoji: { fontSize: 18, marginRight: 6 },
  sensorText: { color: '#666', fontSize: 14 },
  sensorValue: {
    fontSize: 22, fontWeight: '600', color: '#22c55e',
  },
  actionButtons: {
    flexDirection: 'row', gap: 16, marginBottom: 20,
  },
  primaryButton: {
    flex: 1, backgroundColor: '#22c55e',
    alignItems: 'center', justifyContent: 'center',
    padding: 12, borderRadius: 8,
  },
  primaryButtonText: {
    color: '#fff', fontSize: 16, fontWeight: '500',
  },
  secondaryButton: {
    flex: 1, borderWidth: 1, borderColor: '#22c55e',
    alignItems: 'center', justifyContent: 'center',
    padding: 12, borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#22c55e', fontSize: 16, fontWeight: '500',
  },
  
  sensor_section:{
    gap: 12,
    flexDirection: 'column'
  },

  sensor_container:{
    height: 320,
    backgroundColor: '#ffffff',
    borderRadius: 21,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',

  }
});
