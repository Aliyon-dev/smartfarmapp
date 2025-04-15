"use client"

import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context/userContext"
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Switch, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Profile = ({ navigation }) => {
  const {user} = useContext(UserContext)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)

  useEffect(() => {
    AsyncStorage.removeItem("userToken")
    const logout = ()=>{
      
    }
    // Simulate fetching user data
    setTimeout(() => {
      // This is the mock data provided
      const mockUserData = {
        data: {
          box_id: {
            box_id: "BX0001",
            id: 2,
            isTaken: false,
          },
          country: "Zambia",
          email: "test@gmail.com",
          first_name: "Aliyon",
          id: 1,
          last_name: "Tembo",
          phone_number: "0777000723",
          state: "Lusaka",
        },
        message: "User details retrieved successfully",
        status: "success",
      }

      setUserData(mockUserData.data)
      setLoading(false)
    }, 1000)
  }, [])

  const navigateBack = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("Fields")
    }
  }

  const toggleBiometric = () => {
    setBiometricEnabled((previousState) => !previousState)
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
  

      <ScrollView style={styles.scrollView}>
        {/* Profile Card */}
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

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {/* Farm Account */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={[styles.menuIcon, styles.iconGreen]}>👨‍🌾</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Farm Account</Text>
              <Text style={styles.menuSubtitle}>Manage your farm profile</Text>
            </View>
            <View style={styles.menuAction}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          {/* Box ID */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={[styles.menuIcon, styles.iconGreen]}>📦</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Box ID: {user.data.box_id.box_id}</Text>
              <Text style={styles.menuSubtitle}>Manage your farm box</Text>
            </View>
            <View style={styles.menuAction}>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          {/* Biometric Security */}
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={[styles.menuIcon, styles.iconGreen]}>🔒</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Face ID / Touch ID</Text>
              <Text style={styles.menuSubtitle}>Manage your device security</Text>
            </View>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#9be9a8" }}
              thumbColor={biometricEnabled ? "#4CAF50" : "#f4f3f4"}
              ios_backgroundColor="#e0e0e0"
              onValueChange={toggleBiometric}
              value={biometricEnabled}
            />
          </View>

          {/* Log out */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={[styles.menuIcon, styles.iconGreen]}>↩️</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Log out</Text>
              <Text style={styles.menuSubtitle}>Log out of your account</Text>
            </View>
            <View style={styles.menuAction}>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          {/* Crop Calendar */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={[styles.menuIcon, styles.iconGreen]}>🌱</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Crop Calendar</Text>
              <Text style={styles.menuSubtitle}>View planting and harvest schedules</Text>
            </View>
            <View style={styles.menuAction}>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          {/* Weather Alerts */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={[styles.menuIcon, styles.iconGreen]}>☁️</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Weather Alerts</Text>
              <Text style={styles.menuSubtitle}>Manage weather notifications</Text>
            </View>
            <View style={styles.menuAction}>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          {/* Help & Support */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={[styles.menuIcon, styles.iconGreen]}>🎧</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Help & Support</Text>
              <Text style={styles.menuSubtitle}>Get assistance with your account</Text>
            </View>
            <View style={styles.menuAction}>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          {/* About App */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={[styles.menuIcon, styles.iconGreen]}>ℹ️</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>About App</Text>
              <Text style={styles.menuSubtitle}>Version 1.0.0</Text>
            </View>
            <View style={styles.menuAction}>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  statusBar: {
    height: 44,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  statusBarTime: {
    fontWeight: "bold",
  },
  statusBarIcons: {
    flexDirection: "row",
    gap: 8,
  },
  statusBarIcon: {
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 24,
    color: "#333333",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    marginTop: 24,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666666",
  },
  profileCard: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 20,
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: "#E8F5E9",
  },
  menuSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
  },
  iconGreen: {
    color: "#4CAF50",
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#888888",
  },
  menuAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  warningIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#FF5722",
  },
  chevron: {
    fontSize: 20,
    color: "#CCCCCC",
  },
  bottomSpacer: {
    height: 40,
  },
})

export default Profile
