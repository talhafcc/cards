import { useState } from "react";
import { Alert, Dimensions, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const HOME_BG = require("../../assets/img_7680.jpg");
const BG_SHIFT = Dimensions.get("window").height * 0.1;

export default function HomeScreen({ session, onQuickPlay, onCreateRoom, onJoinRoom, onLogout }) {
  const [joinRoomID, setJoinRoomID] = useState("");

  function onRoomCodeChange(value) {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
    setJoinRoomID(digitsOnly);
  }

  function handleJoinRoom() {
    const nextRoomID = joinRoomID.trim();
    if (!/^\d{6}$/.test(nextRoomID)) {
      Alert.alert("Invalid room code", "Enter a valid 6-digit room code.");
      return;
    }
    onJoinRoom(nextRoomID);
    setJoinRoomID("");
  }

  return (
    <ImageBackground source={HOME_BG} style={styles.container} imageStyle={styles.bgImage} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.mainActions}>
          <Text style={styles.title}>Welcome, {session.username}</Text>
          <Text style={styles.subtitle}>Choose how you want to play</Text>

          <Pressable style={[styles.button, styles.primary]} onPress={onCreateRoom}>
            <Text style={styles.buttonText}>Create Room</Text>
          </Pressable>

          <View style={styles.joinBlock}>
            <TextInput
              style={styles.input}
              placeholder="6-digit room code"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={6}
              value={joinRoomID}
              onChangeText={onRoomCodeChange}
            />
            <Pressable style={[styles.button, styles.secondary]} onPress={handleJoinRoom}>
              <Text style={styles.buttonText}>Join Room</Text>
            </Pressable>
          </View>

          <Pressable style={[styles.button, styles.tertiary]} onPress={onQuickPlay}>
            <Text style={styles.buttonText}>Quick Play</Text>
          </Pressable>
        </View>

        <Pressable style={[styles.button, styles.secondary, styles.logoutButton]} onPress={onLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    top: -BG_SHIFT,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(7, 16, 13, 0.34)",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  mainActions: {
    flex: 1,
    justifyContent: "center",
    gap: 14,
  },
  title: {
    color: "#f8efcf",
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    color: "#d5e2d7",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#c84f2f",
  },
  secondary: {
    backgroundColor: "#4a6158",
  },
  tertiary: {
    backgroundColor: "#2f7d67",
  },
  logoutButton: {
    marginBottom: 8,
  },
  joinBlock: {
    gap: 8,
  },
  input: {
    backgroundColor: "#f4f2e8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
