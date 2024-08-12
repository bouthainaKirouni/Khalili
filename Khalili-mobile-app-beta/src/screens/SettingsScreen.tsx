import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Define individual setting screens
const AccountScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Account Settings</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Notifications Settings</Text>
  </View>
);

const AppearanceScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Appearance Settings</Text>
  </View>
);

const PrivacyScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Privacy Settings</Text>
  </View>
);

const HelpScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Help and Support</Text>
  </View>
);

const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>About</Text>
  </View>
);

// Main Settings Screen with navigation links
const SettingsScreen = ({ navigation }) => {
  const settings = [
    { name: "Account", screen: "Account", icon: "person-outline" },
    {
      name: "Notifications",
      screen: "Notifications",
      icon: "notifications-outline",
    },
    { name: "Appearance", screen: "Appearance", icon: "color-palette-outline" },
    {
      name: "Privacy Settings",
      screen: "Privacy",
      icon: "lock-closed-outline",
    },
    { name: "Help and Support", screen: "Help", icon: "help-circle-outline" },
    { name: "About", screen: "About", icon: "information-circle-outline" },
  ];

  return (
    <View style={styles.container}>
      {settings.map((setting, index) => (
        <TouchableOpacity
          key={index}
          style={styles.settingItem}
          onPress={() => navigation.navigate(setting.screen)}
        >
          <View style={styles.settingContent}>
            <Icon
              name={setting.icon}
              size={24}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.settingText}>{setting.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
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

const Stack = createStackNavigator();
const { width, height } = Dimensions.get("window");

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Appearance" component={AppearanceScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  settingItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: {
    fontSize: 18,
    color: "#333",
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height - 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});
