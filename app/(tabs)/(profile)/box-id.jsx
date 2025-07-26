
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import {UserContext} from "../../../context/userContext";
import ProfileHeader from './ProfileHeader';
import styles from './styles';

const BoxId = () => {
  const { user } = useContext(UserContext);
  const [boxId, setBoxId] = useState("00000");
  const [isEditing, setIsEditing] = useState(false);

  const handleScan = () => {
    // Add logic to scan a new box ID
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Add logic to save the new box ID
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ProfileHeader title="Box ID" />
      <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Farm Box ID</Text>
        {isEditing ? (
          <TextInput
            style={styles.boxId}
            value={boxId || "No box ID"}
            onChangeText={setBoxId}
            autoFocus
          />
        ) : (
          <Text style={styles.boxId}>{boxId || "No box ID"}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleScan}>
          <Text style={styles.buttonText}>Scan New Box</Text>
        </TouchableOpacity>
      </View>

      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Enter Manually</Text>
        </TouchableOpacity>
      )}
      </View>
    </SafeAreaView>
  );
};

export default BoxId;
