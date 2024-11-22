import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("./../../assets/images/tbf.jpg")}
        style={styles.heroSection}
      >
        <Text style={styles.title}>Tunnel Booster Fan Monitoring App</Text>
        <Text style={styles.subtitle}>
          Optimize Maintenance with AI & ML-Driven Insights
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push("/(tabs)/Dashboard")}
        >
          <Text style={styles.ctaButtonText}>DashBoard</Text>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why To Choose Our App?</Text>
        <View style={styles.featureCard}>
          <Image
            source={require("./../../assets/images/prediction.jpg")}
            style={styles.featureIcon}
          />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Predictive Maintenance</Text>
            <Text style={styles.featureDescription}>
              Leverage AI & ML to predict maintenance needs, reducing downtime
              and operational costs.
            </Text>
          </View>
        </View>
        <View style={styles.featureCard}>
          <Image
            source={require("./../../assets/images/monitoring.jpg")}
            style={styles.featureIcon}
          />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Real-Time Monitoring</Text>
            <Text style={styles.featureDescription}>
              Monitor TBF performance in real-time and get instant alerts for
              any anomalies.
            </Text>
          </View>
        </View>
        <View style={styles.featureCard}>
          <Image
            source={require("./../../assets/images/history.jpg")}
            style={styles.featureIcon}
          />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Historical Data Analysis</Text>
            <Text style={styles.featureDescription}>
              Analyze past performance and maintenance records to improve future
              operations.
            </Text>
          </View>
        </View>
        <View style={styles.featureCard}>
          <Image
            source={require("./../../assets/images/userfriendly.jpg")}
            style={styles.featureIcon}
          />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>User-Friendly Interface</Text>
            <Text style={styles.featureDescription}>
              Intuitive design that makes monitoring and maintenance easy for
              everyone.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepCard}>
          <Image
            source={require("./../../assets/images/datacollection.jpg")}
            style={styles.stepIcon}
          />
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Data Collection</Text>
            <Text style={styles.stepDescription}>
              Collect data from TBFs during operation and mock drills.
            </Text>
          </View>
        </View>
        <View style={styles.stepCard}>
          <Image
            source={require("./../../assets/images/mlanalysis.jpg")}
            style={styles.stepIcon}
          />
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>ML Analysis</Text>
            <Text style={styles.stepDescription}>
              Our ML model analyzes historical and real-time data to predict
              maintenance needs.
            </Text>
          </View>
        </View>
        <View style={styles.stepCard}>
          <Image
            source={require("./../../assets/images/alerts.jpg")}
            style={styles.stepIcon}
          />
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Maintenance Alerts</Text>
            <Text style={styles.stepDescription}>
              Receive alerts when your TBFs require attention, optimizing
              maintenance efforts.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  heroSection: {
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f4c75",
    padding: 20,
  },
  title: {
    marginTop: 60,
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#FAF3DD",
    marginVertical: 10,
    textAlign: "center",
  },
  ctaButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  featuresSection: {
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0f4c75",
    textAlign: "center",
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  featureIcon: {
    width: 70,
    height: 80,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#0f4c75",
  },
  featureDescription: {
    fontSize: 14,
    color: "#555555",
  },
  howItWorksSection: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  stepCard: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f7f9fc",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  stepIcon: {
    width: 70,
    height: 80,
    marginRight: 15,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#0f4c75",
  },
  stepDescription: {
    fontSize: 14,
    color: "#555555",
  },
});

export default Home;
