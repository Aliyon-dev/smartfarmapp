
import React from 'react';
import { View, Text } from 'react-native';
import styles from './main-style';

const ProfileCard = ({ user }) => (
  <View style={styles.profileCard}>
    <View style={styles.profileImageContainer}>
      <View style={styles.profileImage}>
        <Text style={styles.profileImageText}>
          {user.data.first_name.charAt(0)}
          {user.data.last_name.charAt(0)}
        </Text>
      </View>
    </View>
    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>
        {user.data.first_name} {user.data.last_name}
      </Text>
      <Text style={styles.profileUsername}>@{user.data.email}</Text>
    </View>
  </View>
);

export default ProfileCard;
