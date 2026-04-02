import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ session, onPlayWithFriends, onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {session.username}</Text>

      <Pressable style={[styles.button, styles.primary]} onPress={onPlayWithFriends}>
        <Text style={styles.buttonText}>Play With Friends</Text>
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
    backgroundColor: "#5b6e66",
  },
  disabled: {
    backgroundColor: "#3f4e47",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
