import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message ?? 'Đã xảy ra lỗi'}</Text>
      <Button title="Thử lại" onPress={() => onRetry?.()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, gap: 10 },
  message: { color: 'red', fontSize: 16, textAlign: 'center' },
});
