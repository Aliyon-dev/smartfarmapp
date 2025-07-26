
import { StyleSheet } from "react-native";

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
  });

  export default styles;
