import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { authenticate } from "../services/authService";
import { saveSession } from "../state/sessionStorage";

export default function LoginScreen({ onLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Missing info", "Enter both username and password.");
      return;
    }

    try {
      setLoading(true);
      const data = await authenticate(username, password);
      const session = {
        username: data.username,
        playerID: data.playerID,
      };
      await saveSession(session);
      onLoggedIn(session);
    } catch (error) {
      const reason =
        error?.response?.data?.reason ||
        error?.message ||
        "Login failed. Check API URL and server status.";
      Alert.alert("Authentication failed", reason);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DubRung</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>{loading ? "Signing in..." : "Sign In"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1f16",
    paddingHorizontal: 24,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#f8efcf",
    textAlign: "center",
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
