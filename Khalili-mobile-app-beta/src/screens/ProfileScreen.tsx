import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Add more account info fields */}
      </View>
      <View style={styles.overlay}>
        <Image
          source={require("../assets/khaliliLogo.png")}
          style={{
            width: 100,
            height: 100,
            marginBottom: 5,
            borderRadius: 50,
          }}
        />
        <Text style={styles.overlayText}>Coming Soon</Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  profileContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height - 100,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProfileScreen;
