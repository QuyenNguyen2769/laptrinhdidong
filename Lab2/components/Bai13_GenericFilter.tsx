import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

// 1. Hàm Generic <T> lọc theo trường 'name' tái sử dụng cho mọi loại object có thuộc tính name
export function filterByName<T extends { name: string }>(items: T[], keyword: string): T[] {
  const query = keyword.trim().toLowerCase();
  if (!query) return items;
  return items.filter((item) => item.name.toLowerCase().includes(query));
}

// 2. Định nghĩa 2 kiểu dữ liệu khác nhau đều có trường 'name'
export interface Book {
  id: number;
  name: string; // Tên sách
  author: string;
  price: number;
}

export interface Category {
  id: string;
  name: string; // Tên thể loại
  itemCount: number;
}

const SAMPLE_BOOKS: Book[] = [
  { id: 1, name: 'Lập trình TypeScript toàn tập', author: 'Dan Vanderkam', price: 220000 },
  { id: 2, name: 'React Native thực chiến', author: 'Alex Banks', price: 280000 },
  { id: 3, name: 'Cấu trúc dữ liệu & Giải thuật', author: 'Robert Sedgewick', price: 350000 },
  { id: 4, name: 'Thiết kế hệ thống vi mô', author: 'Martin Fowler', price: 400000 },
];

const SAMPLE_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Công nghệ thông tin', itemCount: 120 },
  { id: 'c2', name: 'Khoa học viễn tưởng', itemCount: 45 },
  { id: 'c3', name: 'Kinh tế & Khởi nghiệp', itemCount: 80 },
  { id: 'c4', name: 'Tâm lý học ứng dụng', itemCount: 60 },
];

export default function Bai13_GenericFilter() {
  const [keyword, setKeyword] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'books' | 'categories'>('books');

  // Áp dụng Generic filterByName<Book> và filterByName<Category>
  const filteredBooks = filterByName<Book>(SAMPLE_BOOKS, keyword);
  const filteredCategories = filterByName<Category>(SAMPLE_CATEGORIES, keyword);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 13: Bộ lọc danh sách Generic (filterByName&lt;T&gt;)</Text>
      <Text style={styles.subText}>
        Hàm: filterByName&lt;T extends &#123; name: string &#125;&gt;(items: T[], keyword: string): T[]
      </Text>

      {/* Tabs chọn kiểu dữ liệu */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'books' && styles.activeTab]}
          onPress={() => setActiveTab('books')}
        >
          <Text style={[styles.tabText, activeTab === 'books' && styles.activeTabText]}>
            📚 Sách ({filteredBooks.length}/{SAMPLE_BOOKS.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'categories' && styles.activeTab]}
          onPress={() => setActiveTab('categories')}
        >
          <Text style={[styles.tabText, activeTab === 'categories' && styles.activeTabText]}>
            🏷️ Thể loại ({filteredCategories.length}/{SAMPLE_CATEGORIES.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ô nhập từ khóa lọc */}
      <TextInput
        style={styles.input}
        placeholder={`Lọc ${activeTab === 'books' ? 'tên sách' : 'tên thể loại'} theo trường name...`}
        value={keyword}
        onChangeText={setKeyword}
      />

      {/* Hiển thị kết quả */}
      <View style={styles.resultList}>
        {activeTab === 'books' ? (
          filteredBooks.map((book) => (
            <View key={book.id} style={styles.card}>
              <Text style={styles.cardName}>📖 {book.name}</Text>
              <Text style={styles.cardSub}>Tác giả: {book.author} | Giá: {book.price.toLocaleString('vi-VN')}đ</Text>
            </View>
          ))
        ) : (
          filteredCategories.map((cat) => (
            <View key={cat.id} style={styles.card}>
              <Text style={styles.cardName}>📂 {cat.name}</Text>
              <Text style={styles.cardSub}>Số lượng đầu sách: {cat.itemCount} cuốn</Text>
            </View>
          ))
        )}

        {(activeTab === 'books' ? filteredBooks.length : filteredCategories.length) === 0 && (
          <Text style={styles.empty}>Không có kết quả nào khớp với "{keyword}"</Text>
        )}
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
    marginBottom: 10,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#f1f3f5',
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 13,
    color: '#495057',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  resultList: {
    gap: 6,
  },
  card: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#20c997',
  },
  cardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212529',
  },
  cardSub: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  empty: {
    color: '#dc3545',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
