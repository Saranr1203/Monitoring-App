import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const Graph = () => {
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [rpmData, setRpmData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [voltageData, setVoltageData] = useState([]);
  const [torqueData, setTorqueData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchData = async () => {
    try {
      const response = await fetch("https://sheetdb.io/api/v1/f45vt2phamoqb");
      const data = await response.json();

      // Format TIME to exclude seconds
      const formatTime = (time: { split: (arg0: string) => [any, any] }) => {
        const [hour, minute] = time.split(":");
        return `${hour}:${minute}`;
      };

      const limitedData = data.slice(-6);

      const newDates = limitedData.map((entry: { Date: any }) => entry.Date);
      const newTimes = limitedData.map((entry: { Time: any }) =>
        formatTime(entry.Time)
      );
      const newVoltageData = limitedData.map((entry: { Voltage: string }) =>
        parseFloat(entry.Voltage)
      );
      const newCurrentData = limitedData.map((entry: { Current: string }) =>
        parseFloat(entry.Current)
      );
      const newTemperatureData = limitedData.map(
        (entry: { Temperature: string }) => parseFloat(entry.Temperature)
      );
      const newRpmData = limitedData.map((entry: { RPM: string }) =>
        parseFloat(entry.RPM)
      );
      const newTorqueData = limitedData.map((entry: { Torque: string }) =>
        parseFloat(entry.Torque)
      );

      setDates(newDates);
      setTimes(newTimes);
      setCurrentData(newCurrentData);
      setRpmData(newRpmData);
      setTemperatureData(newTemperatureData);
      setVoltageData(newVoltageData);
      setTorqueData(newTorqueData);

      setLoading(false); // Data has been loaded, stop loading
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Stop loading in case of error as well
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F0F0",
        }}
      >
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            marginTop: 5,
            fontWeight: "bold",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ padding: 10, backgroundColor: "#F0F0F0" }}
    >
      <View style={{ marginTop: 40 }}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Current
          </Text>
          <LineChart
            data={{
              labels: times,
              datasets: [
                {
                  data: currentData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 30} // adjusted width
            height={220}
            yAxisSuffix=" A"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#f7f7f7",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#007AFF",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              backgroundColor: "#ffffff",
              padding: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Voltage
          </Text>
          <LineChart
            data={{
              labels: times,
              datasets: [
                {
                  data: voltageData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 30} // adjusted width
            height={220}
            yAxisSuffix=" V"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#f7f7f7",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#007AFF",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              backgroundColor: "#ffffff",
              padding: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            RPM
          </Text>
          <LineChart
            data={{
              labels: times,
              datasets: [
                {
                  data: rpmData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 30} // adjusted width
            height={220}
            // yAxisSuffix=" V"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#f7f7f7",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#007AFF",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              backgroundColor: "#ffffff",
              padding: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Torque
          </Text>
          <LineChart
            data={{
              labels: times,
              datasets: [
                {
                  data: torqueData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 30} // adjusted width
            height={220}
            // yAxisSuffix=" V"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#f7f7f7",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#007AFF",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              backgroundColor: "#ffffff",
              padding: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
          />
        </View>

        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Temperature
          </Text>
          <LineChart
            data={{
              labels: times,
              datasets: [
                {
                  data: temperatureData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 30} // adjusted width
            height={220}
            // yAxisSuffix=" V"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#f7f7f7",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#007AFF",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              backgroundColor: "#ffffff",
              padding: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
          />
        </View>
      </View>
      {/* <Sheet /> */}
    </ScrollView>
  );
};

export default Graph;
