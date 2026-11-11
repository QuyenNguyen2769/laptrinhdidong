import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address?: {
    street: string;
    city: string;
  };
}

export default function Bai10_UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = (await res.json()) as User;
      setUser(data);
    } catch (error) {
      console.error('Lỗi fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 10: Chi tiết người dùng (User Profile Detail)</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={fetchUser}>
          <Text style={styles.btnText}>Gọi API (User 1)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearBtn]} onPress={clearUser}>
          <Text style={styles.btnText}>Xóa dữ liệu (Null)</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="small" color="#007AFF" style={{ marginVertical: 10 }} />}

      {/* Xử lý null và Optional Chaining user?. */}
      {user === null ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Chưa có dữ liệu người dùng (User là null)</Text>
          <Text style={styles.subText}>Bấm nút "Gọi API" ở trên để tải thông tin</Text>
        </View>
      ) : (
        <View style={styles.profileBox}>
          <Text style={styles.name}>{user?.name} (@{user?.username})</Text>
          <Text style={styles.info}>📧 Email: {user?.email}</Text>
          <Text style={styles.info}>📞 Điện thoại: {user?.phone}</Text>
          <Text style={styles.info}>🌐 Website: {user?.website}</Text>
          <Text style={styles.info}>🏢 Công ty: {user?.company?.name}</Text>
          <Text style={styles.info}>📍 Địa chỉ: {user?.address?.street}, {user?.address?.city}</Text>
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
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  clearBtn: {
    backgroundColor: '#6c757d',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyBox: {
    padding: 16,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  subText: {
    fontSize: 12,
    color: '#868e96',
    marginTop: 4,
  },
  profileBox: {
    padding: 14,
    backgroundColor: '#e7f5ff',
    borderRadius: 8,
    borderColor: '#74c0fc',
    borderWidth: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1864ab',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: '#343a40',
  },
});
