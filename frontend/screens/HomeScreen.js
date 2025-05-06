import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [question, setQuestion] = useState('');

  const handleAsk = () => {
    if (question.trim()) {
      navigation.navigate('Chat', { initialQuestion: question });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask something..."
        value={question}
        onChangeText={setQuestion}
      />
      <Button title="Ask Chatbot" onPress={handleAsk} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
});

export default HomeScreen;
