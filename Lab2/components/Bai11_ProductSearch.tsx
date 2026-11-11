import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail?: string;
}

interface ProductSearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function Bai11_ProductSearch() {
  const [keyword, setKeyword] = useState<string>('phone');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);

  // Type annotations cho tham số hàm bất đồng bộ
  const fetchProducts = async (query: string, limit: number): Promise<void> => {
    try {
      setLoading(true);
      setSearched(true);
      const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      const data = (await res.json()) as ProductSearchResponse;
      setProducts(data.products);
    } catch (error) {
      console.error('Lỗi tìm sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProducts(keyword, 5);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 11: Tìm kiếm sản phẩm (Product Search API)</Text>
      <Text style={styles.subText}>Hàm: fetchProducts(keyword: string, limit: number)</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa (vd: phone, laptop)..."
          value={keyword}
          onChangeText={setKeyword}
        />
        <TouchableOpacity style={styles.btnSearch} onPress={handleSearch}>
          <Text style={styles.btnText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="small" color="#007AFF" style={{ marginVertical: 10 }} />}

      {searched && !loading && products.length === 0 && (
        <Text style={styles.noResult}>Không tìm thấy sản phẩm nào phù hợp!</Text>
      )}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            {item.thumbnail ? (
              <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            ) : null}
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemCat}>Danh mục: {item.category}</Text>
              <Text style={styles.itemPrice}>Giá: ${item.price}</Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />
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
  searchRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  btnSearch: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  noResult: {
    color: '#dc3545',
    textAlign: 'center',
    marginVertical: 8,
  },
  itemCard: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 6,
    gap: 10,
    alignItems: 'center',
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#e9ecef',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  itemCat: {
    fontSize: 12,
    color: '#6c757d',
  },
  itemPrice: {
    fontSize: 13,
    color: '#28a745',
    fontWeight: 'bold',
  },
});
