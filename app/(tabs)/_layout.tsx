import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from "@expo/vector-icons/AntDesign";

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          tabBarLabel: "",
          tabBarIconStyle: { marginBottom: -10 },
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          headerShown: false,
          title: "DashBoard",
          tabBarIcon: ({ color }) => (
            <AntDesign name="bars" size={24} color={color} />
          ),
          tabBarLabel: "",
          tabBarIconStyle: { marginBottom: -10 },
        }}
      />
      {/* <Tabs.Screen
        name="Graph"
        options={{
          headerShown: false,
          title: "Graph",
          tabBarIcon: ({ color }) => (
            <Entypo name="line-graph" size={24} color={color} />
          ),
          tabBarLabel: "",
          tabBarIconStyle: { marginBottom: -10 },
        }}
      /> */}
      <Tabs.Screen
        name="AboutUs"
        options={{
          headerShown: false,
          title: "AboutUs",
          tabBarIcon: ({ color }) => (
            <AntDesign name="team" size={24} color={color} />
          ),
          tabBarLabel: "",
          tabBarIconStyle: { marginBottom: -10 },
        }}
      />
      
    </Tabs>
  );
}
