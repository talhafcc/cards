import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connectSocket } from "../services/socketService";

const INCOMING_EVENTS = [
  "login",
  "user joined",
  "deal",
  "your turn",
  "card thrown",
  "request trump",
  "reveal trump",
  "trump card",
  "choose trump",
  "choose bet",
  "winner announcement",
  "hands picked",
  "senior player",
  "disable ui",
  "enable ui",
  "trump setted",
  "redeal",
  "new sequence",
  "mooda",
  "share cards",
  "message",
  "bet",
  "accepted",
  "rejected",
  "room full",
  "user left",
  "disconnect",
  "reconnect",
  "reconnect_error",
  "reset",
];

export default function GameScreen({ session }) {
  const [socketStatus, setSocketStatus] = useState("connecting");
  const [hand, setHand] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  const [logs, setLogs] = useState([]);

  const socket = useMemo(() => connectSocket(), []);

  function appendLog(text) {
    setLogs((prev) => [`${new Date().toLocaleTimeString()} - ${text}`, ...prev].slice(0, 50));
  }

  function throwCard(cardCode) {
    if (!socket.connected) {
      Alert.alert("Socket disconnected", "Trying to reconnect.");
      socket.connect();
      return;
    }

    socket.emit("card thrown", cardCode);
    setHand((prev) => prev.filter((card) => card !== cardCode));
    appendLog(`emit card thrown: ${cardCode}`);
  }

  useEffect(() => {
    function onConnect() {
      setSocketStatus("connected");
      socket.emit("add user", {
        username: session.username,
        playerID: session.playerID,
      });
      appendLog("emit add user");
    }

    function onDisconnect() {
      setSocketStatus("disconnected");
      appendLog("socket disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    INCOMING_EVENTS.forEach((eventName) => {
      socket.on(eventName, (payload) => {
        appendLog(`on ${eventName}`);

        if (eventName === "deal" && payload?.hand) {
          setHand(payload.hand);
        }

        if (eventName === "card thrown" && payload?.message) {
          setTableCards((prev) => [payload.message, ...prev].slice(0, 4));
        }

        if (eventName === "room full") {
          Alert.alert("Room full", "Please wait for a new room.");
        }
      });
    });

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      INCOMING_EVENTS.forEach((eventName) => socket.removeAllListeners(eventName));
    };
  }, [session.playerID, session.username, socket]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Game Table</Text>
      <Text style={styles.meta}>Socket: {socketStatus}</Text>
      <Text style={styles.meta}>Player: {session.username}</Text>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Table Cards</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.row}>
            {tableCards.length ? (
              tableCards.map((card, idx) => (
                <View style={styles.tableCard} key={`${card}-${idx}`}>
                  <Text style={styles.cardText}>{card}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No cards on table</Text>
            )}
          </View>
        </ScrollView>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Your Hand</Text>
        <FlatList
          data={hand}
          keyExtractor={(item, index) => `${item}-${index}`}
          numColumns={4}
          contentContainerStyle={styles.handList}
          renderItem={({ item }) => (
            <Pressable style={styles.handCard} onPress={() => throwCard(item)}>
              <Text style={styles.cardText}>{item}</Text>
            </Pressable>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Waiting for deal...</Text>}
        />
      </View>

      <View style={[styles.panel, styles.logPanel]}>
        <Text style={styles.panelTitle}>Event Log</Text>
        <FlatList
          data={logs}
          keyExtractor={(item, index) => `${index}-${item}`}
          renderItem={({ item }) => <Text style={styles.logLine}>{item}</Text>}
          ListEmptyComponent={<Text style={styles.emptyText}>No events yet</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f221d",
    paddingHorizontal: 14,
    gap: 8,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#f8efcf",
    marginTop: 8,
  },
  meta: {
    color: "#c3d0c8",
    fontSize: 12,
  },
  panel: {
    backgroundColor: "#19352d",
    borderRadius: 10,
    padding: 10,
  },
  panelTitle: {
    color: "#f8efcf",
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  handList: {
    gap: 8,
  },
  handCard: {
    backgroundColor: "#f4f2e8",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    minWidth: 64,
    alignItems: "center",
  },
  tableCard: {
    backgroundColor: "#f4f2e8",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    minWidth: 66,
    alignItems: "center",
  },
  cardText: {
    fontWeight: "700",
    color: "#23342d",
  },
  emptyText: {
    color: "#a3b3aa",
  },
  logPanel: {
    flex: 1,
  },
  logLine: {
    color: "#d8e1dc",
    fontSize: 12,
    marginBottom: 4,
  },
});
