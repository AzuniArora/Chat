// screens/ChatScreen.js
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import socket from "../utils/socket";

const ChatScreen = ({ route }) => {
  const { initialQuestion } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Append user's first question
    setMessages([{ sender: "user", text: initialQuestion }]);

    // Emit the first question
    socket.emit("userQuestion", initialQuestion);

    // Listen for bot answer
    socket.on("botAnswer", (reply) => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    });

    return () => {
      socket.off("botAnswer");
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    socket.emit("userQuestion", input);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text
            style={{
              alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: item.sender === "user" ? "#d0f0c0" : "#eee",
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
              maxWidth: "80%",
            }}
          >
            {item.sender === "user" ? "You" : "Bot"}: {item.text}
          </Text>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
});

export default ChatScreen;
