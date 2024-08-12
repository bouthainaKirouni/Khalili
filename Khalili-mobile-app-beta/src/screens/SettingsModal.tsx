import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import Tts from "react-native-tts";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const SettingsModal = ({
  visible,
  onClose,
  language,
  setLanguage,
  apiKey,
  setApiKey,
}) => {
  const [inputLanguage, setInputLanguage] = useState(language);
  const [inputApiKey, setInputApiKey] = useState(apiKey);

  useEffect(() => {
    // Load language setting from cache
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language");
        if (savedLanguage) {
          setInputLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Error loading language from cache:", error);
      }
    };

    loadLanguage();
  }, []);

  useEffect(() => {
    // Save language setting to cache whenever it changes
    const saveLanguage = async () => {
      try {
        await AsyncStorage.setItem("language", inputLanguage);
      } catch (error) {
        console.error("Error saving language to cache:", error);
      }
    };

    saveLanguage();
  }, [inputLanguage]);

  const handleSave = () => {
    setLanguage(inputLanguage);
    setApiKey(inputApiKey);
    Tts.setDefaultLanguage(
      inputLanguage === "ar"
        ? "ar-SA"
        : inputLanguage === "fr"
        ? "fr-FR"
        : "en-US"
    );
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            source={require("../assets/khaliliLogo.png")} // Adjust the path according to your project structure
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
              // margin: 10,
            }}
          />
          <Text style={styles.modalTitle}>Settings</Text>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                marginVertical: 10,
                textAlign: "left",
                color: "#333",
              }}
            >
              TTS Language
            </Text>
            <Picker
              selectedValue={inputLanguage}
              style={styles.picker}
              onValueChange={(itemValue) => setInputLanguage(itemValue)}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Arabic" value="ar" />
              <Picker.Item label="French" value="fr" />
            </Picker>
          </View>

          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                marginVertical: 10,
                textAlign: "left",
                color: "#333",
              }}
            >
              Gemini API Key
            </Text>

            <TextInput
              style={styles.textInput}
              value={inputApiKey}
              onChangeText={setInputApiKey}
              placeholder="Enter API Key"
            />
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.saveButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}

          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#ccc",
              marginTop: 20,
            }}
          ></View>

          <Text style={styles.appInfo}>
            Khalili is a demo app for image recognition using Google's
            Generative AI (gemini), designed to assist blind and visually
            impaired users with voice descriptions of their surroundings.
          </Text>

          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              color: "#333",
            }}
          >
            Version: 0.1.0 Beta
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "left",
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#f8f9fa",
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  appInfo: {
    fontSize: 14,
    marginVertical: 20,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default SettingsModal;
