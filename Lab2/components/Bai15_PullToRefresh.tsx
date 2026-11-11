import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

export interface BookItem {
  id: number;
  title: string;
  author: string;
  views: number;
}

export default function Bai15_PullToRefresh() {
  const [data, setData] = useState<BookItem[]>([]);
  // Phân biệt 2 trạng thái: loading ban đầu vs refreshing khi kéo
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Hàm sinh dữ liệu mới mô phỏng tải mới từ server
  const loadData = async (isPullToRefresh = false) => {
    if (isPullToRefresh) {
      setRefreshing(true);
    } else {
      setInitialLoading(true);
    }

    try {
      // Giả lập độ trễ mạng 1.2 giây
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Lấy dữ liệu ngẫu nhiên từ API hoặc sinh dữ liệu mới
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
      const posts = await res.json();

      const freshBooks: BookItem[] = posts.map((p: any) => ({
        id: p.id,
        title: p.title.slice(0, 30) + '...',
        author: `Tác giả #${p.userId}`,
        views: Math.floor(Math.random() * 500) + 50,
      }));

      setData(freshBooks);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Lỗi refresh:', error);
    } finally {
      setInitialLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(false);
  }, []);

  const handleRefresh = () => {
    loadData(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 15: Tải lại trang (Pull to Refresh State)</Text>
      <Text style={styles.subText}>
        Đồng bộ state: initialLoading ({String(initialLoading)}) &amp; refreshing ({String(refreshing)})
      </Text>

      {/* Thông tin trạng thái và nút test cho môi trường Web/PC */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          🕒 Cập nhật lần cuối: <Text style={styles.bold}>{lastUpdated || 'Đang tải...'}</Text>
        </Text>
        <TouchableOpacity style={styles.btnSimulate} onPress={handleRefresh} disabled={refreshing}>
          <Text style={styles.btnSimulateText}>
            {refreshing ? '🔄 Đang Refresh...' : '⚡ Kéo tải lại (Pull to Refresh)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hiển thị loading ban đầu */}
      {initialLoading ? (
        <View style={styles.initialLoadingBox}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải dữ liệu lần đầu...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.bookTitle}>📚 {item.title}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.author}>{item.author}</Text>
                <Text style={styles.views}>👁️ {item.views} lượt đọc</Text>
              </View>
            </View>
          )}
          style={{ maxHeight: 280 }}
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
  },
  subText: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 8,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    color: '#495057',
  },
  bold: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  btnSimulate: {
    backgroundColor: '#20c997',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnSimulateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  initialLoadingBox: {
    padding: 30,
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    fontSize: 13,
    color: '#6c757d',
  },
  card: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    fontSize: 12,
    color: '#6c757d',
  },
  views: {
    fontSize: 12,
    color: '#0d6efd',
    fontWeight: '500',
  },
});
