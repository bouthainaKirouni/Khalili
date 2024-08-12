import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  useWindowDimensions,
} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import RNFetchBlob from "react-native-blob-util";
import Tts from "react-native-tts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Genmini_api_key } from "./credintials";
import SettingsModal from "../screens/SettingsModal";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const App = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [recognizedText, setRecognizedText] = useState(null);
  const [language, setLanguage] = useState("en");
  const [apiKey, setApiKey] = useState(Genmini_api_key); // API key for Google Generative AI
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const camera = useRef(null);
  const [processing, setProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track TTS status
  const { width } = useWindowDimensions();

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  const device = useCameraDevice("back"); // Use the back camera

  useEffect(() => {
    // Load language setting from cache
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language");
        if (savedLanguage) {
          setLanguage(savedLanguage);
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
        await AsyncStorage.setItem("language", language);
      } catch (error) {
        console.error("Error saving language to cache:", error);
      }
    };

    saveLanguage();
  }, [language]);

  useEffect(() => {
    // Check and request camera permission
    const checkCameraPermission = async () => {
      // use react-native-permissions to check camera permission
      const status = await Camera.getCameraPermissionStatus();
      if (status === "granted") {
        setCameraPermission(true);
      } else {
        const permission = await Camera.requestCameraPermission();
        setCameraPermission(permission === "granted");
        console.log("Camera permission:", permission);
      }
    };
    checkCameraPermission();
  }, []);

  useEffect(() => {
    // Set TTS language and handle TTS events
    Tts.setDefaultLanguage(
      language === "ar" ? "ar-SA" : language === "fr" ? "fr-FR" : "en-US"
    );
    const onStart = () => setIsSpeaking(true);
    const onStop = () => setIsSpeaking(false);
    Tts.addEventListener("tts-start", onStart);
    Tts.addEventListener("tts-finish", onStop);
    Tts.addEventListener("tts-cancel", onStop);
  }, [language]);

  const promptImageRecognition = async (imagePath) => {
    setIsLoading(true);
    setProcessing(true);

    try {
      // Read image as base64 and perform recognition
      const base64Data = await RNFetchBlob.fs.readFile(imagePath, "base64");
      console.log("Base64 Data:", base64Data);

      const image = {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      };

      const prompt =
        language === "ar"
          ? "ماذا ترى في هذه الصورة؟"
          : language === "fr"
          ? "Que voyez-vous sur cette image?"
          : "What do you see in this image?";

      const result = await model.generateContent([prompt, image]);

      console.log("----> Result: ", result.response.text());

      setRecognizedText(result.response.text());

      // Play the recognition result
      Tts.speak(result.response.text());
    } catch (error) {
      console.error("Error recognizing image:", error);
      Alert.alert(
        "Image Recognition Failed",
        "Unable to recognize the image. Please try again."
      );
    } finally {
      setIsLoading(false);
      setProcessing(false);
    }
  };

  const closeSettings = () => {
    setIsModalVisible(false);
  };

  const takePhoto = async () => {
    try {
      if (!camera.current) {
        console.error("Camera reference not available.");
        return;
      }

      switch (language) {
        case "ar":
          // loading play wait
          Tts.speak("الرجاء الانتظار");
          break;
        case "fr":
          Tts.speak("Veuillez patienter");
          break;
        case "en":
          Tts.speak("Please wait");
          break;

        default:
          break;
      }

      const photo = await camera.current.takePhoto();
      if (photo) {
        setCapturedPhoto(`file://${photo.path}`);
        setShowPreview(true);
        promptImageRecognition(photo.path);
      } else {
        console.error("Photo captured is undefined or empty.");
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const handlePress = () => {
    if (isSpeaking) {
      // Stop TTS playback and reset states
      Tts.stop();
      setRecognizedText(null);
      setCapturedPhoto(null);
      setShowPreview(false);
      setRecognizedText(null);
      setIsLoading(false);
      setProcessing(false);
    } else {
      takePhoto();
    }
  };

  if (cameraPermission === null) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Image
          source={require("../assets/khaliliLogo.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <ActivityIndicator size="large" color="green" />
        <Text>Checking camera permission...</Text>
      </View>
    );
  }

  if (!cameraPermission) {
    return <Text>Camera permission not granted</Text>;
  }

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/khaliliLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Khalili</Text>
        </View>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/setting.png")}
              style={styles.settingsIcon}
            />

            <Text
              style={{
                fontSize: 14,
                color: "black",
                marginRight: 10,
              }}
            >
              {language}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.cameraContainer}>
        <Camera
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
          }}
          device={device}
          isActive={true}
          ref={camera}
          photo={true}
        />
        <TouchableOpacity style={styles.fullScreen} onPress={handlePress}>
          {!isSpeaking && (
            <Text style={styles.instructionText}>
              {language === "ar"
                ? "اضغط للتعرف على الصورة"
                : language === "fr"
                ? "Appuyez pour reconnaître l'image"
                : "Press to recognize the image"}
            </Text>
          )}
        </TouchableOpacity>
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </View>
      {recognizedText && (
        <Text style={styles.resultText}>{recognizedText}</Text>
      )}
      <SettingsModal
        visible={isModalVisible}
        onClose={closeSettings}
        language={language}
        setLanguage={setLanguage}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "absolute",
    zIndex: 1,
    top: 0,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  settingsIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  cameraContainer: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  instructionText: {
    color: "white",
    fontSize: 18,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
  },
  loaderContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    zIndex: 1,
    bottom: 50,
    alignContent: "center",
    alignSelf: "center",
    padding: 20,
    borderRadius: 20,
  },
  resultText: {
    marginBottom: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    margin: 10,
  },
});

export default App;
