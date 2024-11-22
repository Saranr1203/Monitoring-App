import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import { router } from "expo-router";

export default function EntryScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 60,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        padding: 20,
        paddingTop: StatusBar.currentHeight
      }}
    >
      <Image
        source={require("./../../assets/images/login.jpg")}
        style={{
            width: "100%",
            height: 300,
            resizeMode: "cover",
            borderRadius: 15,
        }}
      />
      <View
        style={{
          marginTop: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            fontWeight: "700",
            color: "#2c3e50",
            lineHeight: 36,
            marginBottom: 10,
          }}
        >
          Welcome to TBF Monitor & Maintenance Tracker
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "#7f8c8d",
            
            paddingHorizontal: 15,
          }}
        >
          Streamline your maintenance processes with ease and efficiency.
        </Text>
        <Pressable
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            marginTop: 270,
            backgroundColor: "#1e90ff",
            width: "100%",
            borderRadius: 25,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 5,
          }}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
