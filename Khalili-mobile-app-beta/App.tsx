// Khalili app by: Boutheyna Kirouni

import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ImageRecognitionComponent from "./src/helpers/ImageRecognitionComponent";

const Tab = createBottomTabNavigator();

export default function App() {
  return <ImageRecognitionComponent />;
}
