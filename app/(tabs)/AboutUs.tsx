import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableOpacity,
} from "react-native";

// Define a type for team members
type TeamMember = {
  name: string;
  role: string;
  image: any;
};

const teamMembers: TeamMember[] = [
  {
    name: "Nikitha",
    role: "Team Leader, CAD Designer",
    image: require("./../../assets/images/nikitha.jpg"),
  },
  {
    name: "Saran",
    role: "App & Website Developer",
    image: require("./../../assets/images/saran.jpg"),
  },
  {
    name: "Sayed Misfar",
    role: "Hardware Developer",
    image: require("./../../assets/images/sayed.jpg"),
  },
  {
    name: "Ranjith Kumar",
    role: "Product Designer",
    image: require("./../../assets/images/ranjithkumar.jpg"),
  },
  {
    name: "Sutharsana",
    role: "ML Developer",
    image: require("./../../assets/images/sutharsana.jpg"),
  },
  {
    name: "Vishvesh",
    role: "Tester",
    image: require("./../../assets/images/vishvesh.jpg"),
  },
];

export default function AboutUs() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleImageClick = (member: TeamMember) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Team Electrons</Text>
      <Text style={styles.subHeader}>
        "We are a passionate group of six aspiring engineers from Sri Krishna
        College of Engineering and Technology, dedicated to innovation and
        excellence in the field of Electrical and Electronics Engineering. As
        EEE students, we strive to harness our skills and creativity to tackle
        real-world challenges and drive technological advancements."
      </Text>
      <View style={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImageClick(member)}
          >
            <View style={styles.memberCard}>
              <Image source={member.image} style={styles.memberImage} />
              <View style={styles.memberDetails}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for displaying the image and details */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedMember && (
            <View style={styles.modalContent}>
              <Image source={selectedMember.image} style={styles.modalImage} />
              <Text style={styles.modalName}>{selectedMember.name}</Text>
              <Text style={styles.modalRole}>{selectedMember.role}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f4f8",
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: "#555",
    paddingHorizontal: 8,
    textAlign: "justify",
    marginBottom: 30,
  },
  teamContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  memberCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  memberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  memberRole: {
    fontSize: 16,
    color: "#777",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
  },
  modalName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  modalRole: {
    fontSize: 18,
    color: "#777",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
