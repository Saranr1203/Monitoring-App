import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Svg, Circle } from "react-native-svg";
import { useEffect, useState } from "react";
import { database, ref, onValue } from "./../firebase/firebaseConfig";
import axios from "axios";
import { set } from "firebase/database";

interface GaugeProps {
  percentage: number;
  value: number;
  unit: string;
  color: string;
  loading: boolean;
}

function Gauge({ percentage, value, unit, color, loading }: GaugeProps) {
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.gaugeContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={color} />
      ) : (
        <>
          <Svg width={125} height={125} viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#e6e6e6"
              strokeWidth={strokeWidth}
              fill="none"
              transform="rotate(-90 50 50)"
            />
            <Circle
              cx="50"
              cy="50"
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </Svg>
          <Text style={styles.gaugeValueText}>
            {value} {unit}
          </Text>
        </>
      )}
    </View>
  );
}

function unit(name: string) {
  switch (name) {
    case "Voltage":
      return "V";
    case "Current":
      return "A";
    case "Temperature":
      return "°C";
    case "RPM":
      return "RPM";
    case "Torque":
      return "Nm";
    default:
      return "";
  }
}

export default function Dashboard() {
  var currentMainTime = Math.floor(Date.now() / 1000);
  const [sensorData, setSensorData] = useState({
    voltage_data: 0,
    current_data: 0,
    temperature_data: 0,
    rpm_data: 0,
    // torque_data: 0,
    power_factor: 0,
    rated_voltage: 0,
    rated_current: 0,
    rated_temperature: 0,
    rated_rpm: 0,
    // rated_torque: 0,
  });

  const [loading, setLoading] = useState(true);
  const [gaugeColor, setGaugeColor] = useState("#4CAF50");
  var fdata: number = 0;
  var AlertShow: boolean = false;

  async function ai(
    voltage: number,
    current: number,
    temperature: number,
    rpm: number
  ) {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
      "These are my rated voltage: " +
      ratedValues.voltage +
      " , rated current: " +
      ratedValues.current +
      " , rated temperature: " +
      ratedValues.temperature +
      " , rated rpm: " +
      ratedValues.rpm +
      ". But My ML model is telling me that my motor requires maintenance. Live voltage data : " +
      voltage +
      " , live current data : " +
      current +
      " , live rpm data : " +
      rpm +
      " , live temperature data : " +
      temperature +
      " . Give me exact reason for the maintenance along with the all the live and rated data in paragraph as short and clear.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }

  async function predict(
    voltage: number,
    current: number,
    temperature: number,
    rpm: number
  ) {
    try {
      const response = await fetch(
        "https://susan27-motor.hf.space/call/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`, // Replace with your Hugging Face API token
          },
          body: JSON.stringify({
            data: [current, rpm, temperature, voltage], // Parameters for prediction
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          if (retryAfter) {
            console.warn(`Rate limit hit. Retry after ${retryAfter} seconds.`);
          }
        }
        throw new Error(
          `Network response was not ok. Status: ${response.status}`
        );
      }

      const resultData = await response.json();

      const detailResponse = await axios.get(
        `https://susan27-motor.hf.space/call/predict/${resultData.event_id}`
      );

      const parsedData = detailResponse.data
        .split("\n")
        .find((line: string) => line.startsWith("data: "));
      const cleanedData = parsedData
        ? parsedData.replace("data: ", "").trim()
        : null;

      const extractedNumber = cleanedData
        ? parseInt(JSON.parse(cleanedData)[0], 10)
        : null;

      // Check if extractedNumber is either 1 or 0
      if (
        extractedNumber === null ||
        (extractedNumber !== 0 && extractedNumber !== 1)
      ) {
        console.warn("Unexpected value extracted:", extractedNumber);
        return 0; // Return 0 if the value is not valid
      } else {
        return extractedNumber;
      }
    } catch (err) {
      console.error(err);
      return 0; // Ensure the function always returns a number
    }
  }

  useEffect(() => {
    const sensorRef = ref(database, "Sensor");

    const unsubscribe = onValue(sensorRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSensorData(data);

        // const trq = (0.97 * 4500 * 60) / (2 * 3.14 * data.rpm_data);
        const pf =
          Math.round(
            ((data.voltage_data * data.current_data * 0.92) /
              (data.voltage_data * data.current_data)) *
              100
          ) / 100;
        setSensorData((prevData) => ({
          ...prevData,
          // torque_data: trq,
          power_factor: pf,
        }));
        // set(ref(database, "Sensor/torque_data"), parseFloat(trq.toFixed(2)));
        set(ref(database, "Sensor/power_factor"), parseFloat(pf.toFixed(2)));

        var currentTime = Math.floor(Date.now() / 1000);
        if (currentTime - currentMainTime > 7) {
          const res = await predict(
            data.voltage_data,
            data.current_data,
            data.temperature_data,
            data.rpm_data
          );
          fdata = res;
          currentMainTime = currentTime;

          if (fdata === 1 && !AlertShow) {
            const reasonText = await ai(
              data.voltage_data,
              data.current_data,
              data.temperature_data,
              data.rpm_data
            );
            setGaugeColor("#FF0000"); // Change all gauge colors to red
            Alert.alert(
              "Maintenance Alert",
              reasonText,
              [{ text: "OK", onPress: () => (AlertShow = false) }],
              {
                cancelable: true,
              }
            );
            AlertShow = true;
          } else {
            if (fdata === 0) {
              setGaugeColor("#4CAF50"); // Keep gauges green
            }
          }
        }

        // Data is loaded
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const values = [
    { name: "Voltage", value: sensorData.voltage_data },
    { name: "Current", value: sensorData.current_data },
    { name: "RPM", value: sensorData.rpm_data },
    { name: "Temperature", value: sensorData.temperature_data },
    // { name: "Torque", value: parseFloat(sensorData.torque_data.toFixed(2)) },
    { name: "Power Factor", value: sensorData.power_factor },
  ];

  const ratedValues = {
    voltage: sensorData.rated_voltage,
    current: sensorData.rated_current,
    temperature: sensorData.rated_temperature,
    rpm: sensorData.rated_rpm,
    // torque: (0.97 * 4500 * 60) / (2 * 3.14 * sensorData.rated_rpm),
  };

  const handleViewFullHistory = () => {
    Linking.openURL(
      "https://docs.google.com/spreadsheets/d/1S8ToECkaL9wQXEb4KpD_li0Q7WZvXe1XvpqFdq18xuo/edit?gid=0#gid=0"
    );
  };

  function value(name: string, data: number) {
    let calculatedValue;
    switch (name) {
      case "Voltage":
        calculatedValue = (data / ratedValues.voltage) * 100;
        break;
      case "Current":
        calculatedValue = (data / ratedValues.current) * 100;
        break;
      case "Temperature":
        calculatedValue = (data / ratedValues.temperature) * 100;
        break;
      case "RPM":
        calculatedValue = (data / ratedValues.rpm) * 100;
        break;
      // case "Torque":
      //   calculatedValue = (data / ratedValues.torque) * 100;
      //   break;
      case "Power Factor":
        calculatedValue = (data / 1) * 100;
        break;
      default:
        calculatedValue = 0;
    }
    return Math.min(calculatedValue, 100);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>DashBoard</Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginLeft: 3,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Fan 1
      </Text>

      <View style={styles.ratedCard}>
        <Text style={styles.ratedHeader}>Rated Parameters</Text>
        <Text style={styles.ratedText}>Voltage : {ratedValues.voltage}</Text>
        <Text style={styles.ratedText}>Current : {ratedValues.current}</Text>
        <Text style={styles.ratedText}>RPM : {ratedValues.rpm}</Text>
        <Text style={styles.ratedText}>
          Temperature : {ratedValues.temperature}
        </Text>
        <Text style={styles.ratedText}>
          {/* Torque : {ratedValues.torque.toFixed(2)} */}
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={handleViewFullHistory}
        >
          <Text style={styles.historyButtonText}>View Full History</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#333",
            textAlign: "center",
          }}
        >
          Location : 10.936684, 76.956156
        </Text>
      </View>

      <View style={styles.grid}>
        {values.map((data, index) => (
          <View key={index} style={styles.card}>
            <Gauge
              percentage={value(data.name, data.value)}
              value={data.value}
              unit={unit(data.name)}
              color={gaugeColor} // Apply the dynamic gauge color
              loading={loading}
            />
            <Text style={styles.labelText}>{data.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  ratedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginRight: 12,
    // marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  ratedHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  ratedText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 5,
    columnGap: 25,
  },
  card: {
    width: "45%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  labelText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
  },
  gaugeContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeValueText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  historyButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  historyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
