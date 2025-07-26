
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { UserContext } from '../../../context/userContext';
import ProfileHeader from './ProfileHeader';
import styles from './styles';

const FarmAccount = () => {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.data.first_name);
  const [lastName, setLastName] = useState(user.data.last_name);
  const [email, setEmail] = useState(user.data.email);

  const handleSaveChanges = () => {
    // Add logic to save changes
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ProfileHeader title="Farm Account" />
      <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Farm Details</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Farm Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your farm name"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your farm location"
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Subscription</Text>
        <Text>Current Plan: Basic</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Upgrade Plan</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmAccount;
