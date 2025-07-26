"use client";

import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { ConfirmLogoutModal } from "../../../components/elements/ConfirmLogoutModal";
import { useRouter } from "expo-router";
import styles from "./main-style";
import ProfileCard from "./ProfileCard"
import MenuItem from "./MenuItem";
import MenuSection from "./MenuSection";

const Profile = () => {
  const { logout, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const toggleBiometric = () => {
    setBiometricEnabled((previousState) => !previousState);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ProfileCard user={user} />

        <MenuSection>
          <MenuItem
            icon="👨‍🌾"
            title="Farm Account"
            subtitle="Manage your farm profile"
            onPress={() => router.push("/farm-account")} // Navigate to farm-account page within profile stack
            warning
          />
          <MenuItem
            icon="📦"
            title="Box ID:"
            subtitle="Manage your farm box"
            onPress={() => router.push("/box-id")} // Navigate to box-id page within profile stack
          />
          <MenuItem
            icon="🔒"
            title="Face ID / Touch ID"
            subtitle="Manage your device security"
            isSwitch
            onSwitchChange={toggleBiometric}
            switchValue={biometricEnabled}
          />
          <MenuItem
            icon="↩️"
            title="Log out"
            subtitle="Log out of your account"
            onPress={() => setVisible(true)}
          />
        </MenuSection>

        <MenuSection>
          <MenuItem
            icon="🌱"
            title="Crop Calendar"
            subtitle="View planting and harvest schedules"
            onPress={() => router.push("/crop-calendar")} // Navigate to crop-calendar page within profile stack
          />
          <MenuItem
            icon="☁️"
            title="Weather Alerts"
            subtitle="Manage weather notifications"
            onPress={() => router.push("/weather-alerts")} // Navigate to weather-alerts page within profile stack
          />
        </MenuSection>

        <MenuSection>
          <MenuItem
            icon="🎧"
            title="Help & Support"
            subtitle="Get assistance with your account"
            onPress={() => {}}
          />
          <MenuItem
            icon="ℹ️"
            title="About App"
            subtitle="Version 1.0.0"
            onPress={() => {}}
          />
        </MenuSection>

        <View style={styles.bottomSpacer}></View>
      </ScrollView>

      <ConfirmLogoutModal
        visible={visible}
        onConfirm={logout}
        onCancel={() => setVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Profile;