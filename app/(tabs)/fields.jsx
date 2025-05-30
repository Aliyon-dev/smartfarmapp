
import { useState, useEffect, useContext} from "react"
import { Pressable } from "react-native"
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
} from "react-native"
import { UserContext } from "../../context/userContext"
import { createField, getCrops, verifyBox } from "../../hooks/apis"
import { useRouter } from "expo-router"


const Fields = () => {  

  const {crops} =  useContext(UserContext)
  const {user} = useContext(UserContext)
  const {fields, refetch} = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [newField, setNewField] = useState({
    field_name: "",
    box_id: "",
  })
  const [selectedCropType, setSelectedCropType] = useState(null)
  const [showCropTypeOptions, setShowCropTypeOptions] = useState(false)
  const cropNames =  crops.map(crop => crop.crop_name)
  const router = useRouter();


  // Custom alert state
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertTitle, setAlertTitle] = useState("")
  const [errors, setErrors] = useState({})

  // Animation for custom spinner
  const spinValue = new Animated.Value(0)

  // Start spinner animation
  useEffect(() => {
    //getCropTypes();
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start()
    } else {
      spinValue.setValue(0)
    }
  }, [loading, spinValue])

  // Create the spin animation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })


  // Custom alert function
  const showAlert = (title, message) => {
    setAlertTitle(title)
    setAlertMessage(message)
    setAlertVisible(true)
  }

  // Fetch fields data from API or local storage
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000) // Simulate API call delay

  }, [])


  const verifybox_id = async (box_id) => {
      console.log(box_id)
      const regex = /^BX\d{4}$/;
      if (!regex.test(box_id)) {
        showAlert("Error", "Invalid Box ID format. It should be in the format 'BX0000'.")
      }
      // check if a box is not connected to another field
      const response = await verifyBox(box_id)
      console.log(response)
      if(response.status === "success"){
        return true
      }
      else{
        showAlert("Error", "Box ID is already in use")

      }

  }


  const addField = () => {
    // Validate form
    if (!newField.field_name.trim() || !newField.box_id.trim()) {
      showAlert("Error", "Please fill in all fields")
      return
    }
    if(!verifybox_id(newField.box_id)){
      return
    }
 
    setLoading(true)

    // Create new field object
    const fieldToAdd = {
      field_name: newField.field_name.trim(),
      box_id: newField.box_id,
    }
  
    // Send to API
    createFieldApi(newField)

  }

  const createFieldApi = async (field) => {
    try{
      const response = await createField(field)
      refetch();
      showAlert("Success", response.message)
      
    }
    catch(error){
      console.log("this is the error", error.response.data)
      showAlert("Error", error.response.data.message)
    }
    finally{
      setLoading(false)
      setModalVisible(false)
      setNewField({ field_name: "", box_id: "", cropType: "" })
      setSelectedCropType(null)
    }
  }

  const selectCropType = (type) => {
    setNewField({ ...newField, cropType: type })
    setSelectedCropType(type)
    setShowCropTypeOptions(false)
  }

const renderFieldItem = ({ item }) => (
  <Pressable
    onPress={() => router.push(`/field-details/${item.id}`)}
    style={styles.fieldItem}
  >
    <View style={styles.fieldHeader}>
      <Text style={styles.fieldName}>{item.field_name}</Text>
      <View style={[styles.cropTypeBadge, getCropTypeColor(item.field_name)]}>
        <Text style={styles.cropTypeText}>{item.field_name}</Text>
      </View>
    </View>
    <Text style={styles.fieldDetail}>Box ID: {item.box.box_id}</Text>
    <Text style={styles.fieldDetail}>
      Added: {new Date(item.createdAt).toLocaleDateString()}
    </Text>
  </Pressable>
);

  const getCropTypeColor = (cropType) => {
    switch (cropType) {
      case "Avocado Field":
        return { backgroundColor: "#4CAF50" } // Green
      case "Tobacco":
        return { backgroundColor: "#795548" } // Brown
      case "Maize":
        return { backgroundColor: "#FFC107" } // Amber
      case "Wheat":
        return { backgroundColor: "#FF9800" } // Orange
      case "Coffee":
        return { backgroundColor: "#8D6E63" } // Brown
      default:
        return { backgroundColor: "#9E9E9E" } // Grey
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Fields</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add Field</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          {/* Custom spinner using Animated */}
          <Animated.View
            style={[
              styles.spinner,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />
          <Text style={styles.loadingText}>Loading fields...</Text>
        </View>
      ) : fields.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No fields added yet</Text>
          <Text style={styles.emptySubText}>Tap the "Add Field" button to get started</Text>
        </View>
      ) : (
        <FlatList
          onPress
          data={fields}
          renderItem={renderFieldItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Add Field Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Field</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Field Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter field name"
                value={newField.field_name}
                onChangeText={(text) => setNewField({ ...newField, field_name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Box ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter box ID"
                value={newField.box_id}
                onChangeText={(text) => setNewField({ ...newField, box_id: text })}
              />
            </View>

            {/* <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Crop Type</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowCropTypeOptions(!showCropTypeOptions)}
              >
                <Text style={selectedCropType ? styles.dropdownSelectedText : styles.dropdownPlaceholder}>
                  {selectedCropType || "Select crop type"}
                </Text>
              </TouchableOpacity>

              {showCropTypeOptions && (
                <View style={styles.dropdownOptions}>
                  {cropNames.map((type) => (
                    <TouchableOpacity key={type} style={styles.dropdownOption} onPress={() => selectCropType(type)}>
                      <Text style={styles.dropdownOptionText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>  */}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false)
                  setNewField({ field_name: "", box_id: ""})
                  setSelectedCropType(null)
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={addField}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Custom Alert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => setAlertVisible(false)}>
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
  },
  fieldItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  fieldHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  cropTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cropTypeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  fieldDetail: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#f3f3f3",
    borderTopColor: "#4CAF50",
    marginBottom: 12,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  dropdownButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  dropdownPlaceholder: {
    color: "#999999",
  },
  dropdownSelectedText: {
    color: "#333333",
  },
  dropdownOptions: {
    marginTop: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownOptionText: {
    color: "#333333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#666666",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    marginLeft: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  // Custom alert styles
  alertContainer: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
    textAlign: "center",
  },
  alertMessage: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 20,
    textAlign: "center",
  },
  alertButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    minWidth: 100,
    alignItems: "center",
  },
  alertButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
})

export default Fields
