import { useState } from "react";
import { Alert, Dimensions, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { authenticate } from "../services/authService";
import { saveSession } from "../state/sessionStorage";

const LOGIN_BG = require("../../assets/img_7680.jpg");
const BG_SHIFT = Dimensions.get("window").height * 0.1;

function randomName() {
  const adj = ["Swift", "Bold", "Sly", "Lucky", "Keen", "Brave", "Cool", "Sharp"];
  const noun = ["Fox", "Ace", "King", "Hawk", "Wolf", "Bear", "Lion", "Star"];
  const a = adj[Math.floor(Math.random() * adj.length)];
  const n = noun[Math.floor(Math.random() * noun.length)];
  const num = Math.floor(Math.random() * 100);
  return `${a}${n}${num}`;
}

export default function LoginScreen({ onLoggedIn }) {
  const [username, setUsername] = useState(randomName());
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const name = username.trim() || randomName();

    try {
      setLoading(true);
      const data = await authenticate(name, "");
      const session = {
        username: data.username,
        playerID: data.playerID,
      };
      onLoggedIn(session);
    } catch (error) {
      const reason =
        error?.response?.data?.reason ||
        error?.message ||
        "Login failed. Check API URL and server status.";
      Alert.alert("Login failed", reason);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground source={LOGIN_BG} style={styles.container} imageStyle={styles.bgImage} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.subtitle}>Tap Play to join</Text>

        <TextInput
          style={styles.input}
          placeholder="nickname"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          disabled={loading}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>{loading ? "Joining..." : "Play"}</Text>
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
    paddingHorizontal: 24,
    paddingBottom: 150,
    justifyContent: "flex-end",
    gap: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#c8d9c2",
    textAlign: "center",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#f4f2e8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 4,
    backgroundColor: "#c84f2f",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
