import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

// 1. Generic Interface ApiResponse<T> theo đúng yêu cầu đề bài
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Kiểu dữ liệu sản phẩm
export interface ProductItem {
  id: number;
  title: string;
  price: number;
  brand?: string;
  category: string;
}

export default function Bai14_Pagination() {
  const [response, setResponse] = useState<ApiResponse<ProductItem> | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const LIMIT = 3; // Mỗi trang 3 sản phẩm

  const fetchPageData = async (targetPage: number) => {
    try {
      setLoading(true);
      const skip = (targetPage - 1) * LIMIT;
      const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`);
      const raw = await res.json();

      // Gán vào Generic Interface ApiResponse<ProductItem>
      const mappedResponse: ApiResponse<ProductItem> = {
        data: raw.products as ProductItem[],
        total: raw.total,
        page: targetPage,
        limit: LIMIT,
        totalPages: Math.ceil(raw.total / LIMIT),
      };

      setResponse(mappedResponse);
      setPage(targetPage);
    } catch (error) {
      console.error('Lỗi phân trang:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData(1);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 14: Phân trang dữ liệu (ApiResponse&lt;T&gt;)</Text>
      <Text style={styles.subText}>
        Generic Interface: ApiResponse&lt;T&gt; &#123; data: T[], total, page, limit, totalPages &#125;
      </Text>

      {/* Thông tin metadata phân trang */}
      {response && (
        <View style={styles.metaBox}>
          <Text style={styles.metaText}>
            📄 Trang hiện tại: <Text style={styles.bold}>{response.page}</Text> / {response.totalPages}
          </Text>
          <Text style={styles.metaText}>
            📦 Tổng số sản phẩm (total): <Text style={styles.bold}>{response.total}</Text>
          </Text>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="small" color="#007AFF" style={{ marginVertical: 20 }} />
      ) : (
        <View style={styles.list}>
          {response?.data.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.itemTitle}>📦 {item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
              <Text style={styles.itemSub}>Danh mục: {item.category} {item.brand ? `| Thương hiệu: ${item.brand}` : ''}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Thanh điều khiển phân trang */}
      <View style={styles.paginationControls}>
        <TouchableOpacity
          style={[styles.pageBtn, (page <= 1 || loading) && styles.disabledBtn]}
          onPress={() => fetchPageData(page - 1)}
          disabled={page <= 1 || loading}
        >
          <Text style={styles.pageBtnText}>◀ Trang trước</Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>Trang {page}</Text>

        <TouchableOpacity
          style={[styles.pageBtn, (loading || (response && page >= response.totalPages)) && styles.disabledBtn]}
          onPress={() => fetchPageData(page + 1)}
          disabled={loading || (response ? page >= response.totalPages : false)}
        >
          <Text style={styles.pageBtnText}>Trang sau ▶</Text>
        </TouchableOpacity>
      </View>
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
  metaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f3f5',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 12,
    color: '#495057',
  },
  bold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  list: {
    gap: 8,
    marginBottom: 10,
  },
  card: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  itemSub: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
  },
  pageBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  disabledBtn: {
    backgroundColor: '#adb5bd',
  },
  pageBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  pageIndicator: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#343a40',
  },
});
