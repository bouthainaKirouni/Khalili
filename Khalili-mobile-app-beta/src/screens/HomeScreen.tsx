import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Tts from "react-native-tts";

const HomeScreen = () => {
  const [daysLeft, setDaysLeft] = useState(30); // Initial days left

  useEffect(() => {
    // Calculate remaining days
    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + 30); // Set target date to 30 days from now

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

      if (remainingDays >= 0) {
        setDaysLeft(remainingDays);
      } else {
        setDaysLeft(0); // If countdown is over, set daysLeft to 0
        clearInterval(interval); // Clear interval once countdown is over
      }
    }, 1000); // Update countdown every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          width: "100%",
          backgroundColor: "#95D2B3",
          height: 250,
          flex: 3,
          position: "absolute",
          top: 0,
        }}
      ></View>
      <Image
        source={require("../assets/khaliliLogo.png")} // Adjust the path according to your project structure
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Khalili</Text>

      <View
        style={{
          padding: 20,
          width: "100%",
        }}
      >
        {/* Countdown Section */}
        <View style={styles.countdown}>
          <Text style={styles.countdownTitle}>Coming Soon</Text>
          <Text style={styles.countdownText}>
            Launching in {daysLeft} {daysLeft === 1 ? "day" : "days"}
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Features and Services</Text>

        {/* Features Section */}
        <TouchableWithoutFeedback
          onPress={() => {
            Tts.speak("Object Identification");
          }}
        >
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>Object Identification</Text>
            <Text style={styles.featureDescription}>
              Khalili allows users to identify objects in their surroundings
              using the device's camera. The app provides audible descriptions
              of the identified objects, making it easier for visually impaired
              users to understand their environment.
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            Tts.speak("Voice Commands");
          }}
        >
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>Voice Commands</Text>
            <Text style={styles.featureDescription}>
              Khalili supports voice commands, enabling hands-free interaction
              with the app. Users can issue commands to identify objects, get
              information about their surroundings, and control other app
              functionalities.
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            Tts.speak("Text-to-Speech");
          }}
        >
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>Text-to-Speech</Text>
            <Text style={styles.featureDescription}>
              Khalili uses advanced text-to-speech technology to provide audible
              feedback. This feature reads out the names and descriptions of
              identified objects, ensuring clear and understandable information
              for users.
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            Tts.speak("Location Services");
          }}
        >
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>Location Services</Text>
            <Text style={styles.featureDescription}>
              Khalili integrates with Google Maps to provide location-based
              services. Users can receive audible directions, locate nearby
              places of interest, and navigate their surroundings with greater
              ease.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  countdown: {
    width: "100%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  countdownTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  countdownText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  feature: {
    width: "100%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 16,
    color: "#666",
  },
});

export default HomeScreen;
