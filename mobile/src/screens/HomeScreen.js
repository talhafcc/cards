import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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
    <View style={styles.container}>
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

      <Pressable style={[styles.button, styles.disabled]}>
        <Text style={styles.buttonText}>Single Player (Coming Soon)</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.secondary]} onPress={onLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102622",
    justifyContent: "center",
    padding: 24,
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
  disabled: {
    backgroundColor: "#3f4e47",
    opacity: 0.7,
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
