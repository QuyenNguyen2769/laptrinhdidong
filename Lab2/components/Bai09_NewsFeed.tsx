import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

export interface Post {
  userId: number;
  id: number;
  title: string;
  completed?: boolean;
}

export default function Bai09_NewsFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = (await res.json()) as Post[];
      setPosts(data);
    } catch (error) {
      console.error('Lỗi fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 9: Danh sách tin tức (News Feed / Todos)</Text>
      <TouchableOpacity style={styles.button} onPress={fetchPosts}>
        <Text style={styles.btnText}>Tải lại dữ liệu</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.badge}>ID: {item.id}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={[styles.status, item.completed ? styles.done : styles.pending]}>
                {item.completed ? '✓ Đã hoàn thành' : '⏳ Đang chờ'}
              </Text>
            </View>
          )}
          scrollEnabled={false}
        />
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
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  badge: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '600',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    marginTop: 2,
  },
  status: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  done: {
    color: '#28a745',
  },
  pending: {
    color: '#fd7e14',
  },
});
