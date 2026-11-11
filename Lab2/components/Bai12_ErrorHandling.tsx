import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';

export interface CustomError {
  status: number;
  message: string;
  endpoint: string;
  timestamp: string;
}

export default function Bai12_ErrorHandling() {
  const [errorInfo, setErrorInfo] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWithIntentionalError = async () => {
    setErrorInfo(null);
    setLoading(true);

    const invalidUrl = 'https://jsonplaceholder.typicode.com/invalid_endpoint_404_error';

    try {
      const res = await fetch(invalidUrl);

      if (!res.ok) {
        // Ném lỗi có cấu trúc để khối catch xử lý
        const errObj: CustomError = {
          status: res.status,
          message: `Gọi API thất bại với mã lỗi HTTP ${res.status} (${res.statusText || 'Not Found'})`,
          endpoint: invalidUrl,
          timestamp: new Date().toLocaleTimeString(),
        };
        throw errObj;
      }

      await res.json();
    } catch (err: unknown) {
      // Ép kiểu trong khối catch về cấu trúc CustomError
      let customErr: CustomError;

      if (typeof err === 'object' && err !== null && 'status' in err && 'message' in err) {
        customErr = err as CustomError;
      } else {
        customErr = {
          status: 500,
          message: (err as Error)?.message || 'Lỗi mạng hoặc không thể kết nối',
          endpoint: invalidUrl,
          timestamp: new Date().toLocaleTimeString(),
        };
      }

      setErrorInfo(customErr);

      // Hiển thị Alert theo đúng yêu cầu đề bài
      Alert.alert(
        '⚠️ Lỗi API (CustomError)',
        `[Mã ${customErr.status}] ${customErr.message}\nURL: ${customErr.endpoint}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 12: Xử lý lỗi API (API Error Handling)</Text>
      <Text style={styles.subText}>Cố tình gọi URL sai ➔ catch lỗi & ép kiểu CustomError ➔ Alert</Text>

      <TouchableOpacity style={styles.btnError} onPress={fetchWithIntentionalError}>
        <Text style={styles.btnText}>⚡ Gọi API Sai URL (Test 404 Error)</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="small" color="#dc3545" style={{ marginVertical: 8 }} />}

      {errorInfo && (
        <View style={styles.errorBox}>
          <Text style={styles.errorHeader}>🚨 Đã bắt được CustomError trong khối catch:</Text>
          <Text style={styles.errorText}>• Mã trạng thái (status): <Text style={styles.bold}>{errorInfo.status}</Text></Text>
          <Text style={styles.errorText}>• Thông điệp (message): {errorInfo.message}</Text>
          <Text style={styles.errorText}>• Endpoint: {errorInfo.endpoint}</Text>
          <Text style={styles.errorText}>• Thời điểm: {errorInfo.timestamp}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subText: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 10,
  },
  btnError: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff5f5',
    borderColor: '#ffc9c9',
    borderWidth: 1,
    borderRadius: 8,
    gap: 4,
  },
  errorHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#c92a2a',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 13,
    color: '#495057',
  },
  bold: {
    fontWeight: 'bold',
    color: '#c92a2a',
  },
});
