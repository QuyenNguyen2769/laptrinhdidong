import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import BottomTabBar, { TabKey } from './BottomTabBar';
import HomeScreen from './HomeScreen';
import BookDetailScreen from './BookDetailScreen';
import CartScreen from './CartScreen';
import CategoryChips from './CategoryChips';
import BookCardWithBadge from './BookCardWithBadge';
import { SAMPLE_BOOKS, Book } from '../data';

export default function Gio5_Screen() {
  const [activeTab, setActiveTab] = useState<TabKey>('cart'); // Mặc định mở Giỏ hàng để minh chứng Bài 2 Giờ 5
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Màn hình Danh mục
  const renderCategoriesScreen = () => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderTitle}>Khám Phá Theo Thể Loại</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 80 }}>
        <CategoryChips />
        <Text style={styles.sectionHeading}>Tất cả đầu sách</Text>
        <View style={styles.gridContainer}>
          {SAMPLE_BOOKS.map((book) => (
            <View key={book.id} style={{ width: '48%' }}>
              <BookCardWithBadge book={book} />
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomTabBar currentTab={activeTab} onSelectTab={setActiveTab} />
    </SafeAreaView>
  );

  // Màn hình Tài khoản
  const renderProfileScreen = () => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderTitle}>Tài Khoản Người Dùng</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, alignItems: 'center', gap: 12 }}>
        <View style={styles.avatarBox}>
          <Text style={{ fontSize: 40 }}>👤</Text>
        </View>
        <Text style={styles.userName}>Nguyễn Văn A</Text>
        <Text style={styles.userEmail}>nguyenvana@gmail.com</Text>

        <View style={styles.menuBox}>
          <Text style={styles.menuItem}>📦 Đơn hàng của tôi (2 đơn)</Text>
          <Text style={styles.menuItem}>❤️ Sách yêu thích (5 cuốn)</Text>
          <Text style={styles.menuItem}>📍 Sổ địa chỉ nhận hàng</Text>
          <Text style={styles.menuItem}>⚙️ Cài đặt tài khoản</Text>
        </View>
      </ScrollView>
      <BottomTabBar currentTab={activeTab} onSelectTab={setActiveTab} />
    </SafeAreaView>
  );

  // Nếu đang mở xem chi tiết một cuốn sách
  if (selectedBook) {
    return (
      <BookDetailScreen
        book={selectedBook}
        onBack={() => setSelectedBook(null)}
      />
    );
  }

  // Render theo tab đang chọn
  switch (activeTab) {
    case 'home':
      return (
        <View style={{ flex: 1 }}>
          <HomeScreen onSelectBook={(book) => setSelectedBook(book)} />
          <BottomTabBar currentTab={activeTab} onSelectTab={setActiveTab} />
        </View>
      );
    case 'categories':
      return renderCategoriesScreen();
    case 'cart':
      return (
        <CartScreen
          currentTab={activeTab}
          onSelectTab={setActiveTab}
        />
      );
    case 'profile':
      return renderProfileScreen();
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  tabHeader: {
    height: 52,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a237e',
    marginVertical: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8eaf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  userEmail: {
    fontSize: 13,
    color: '#757575',
  },
  menuBox: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 12,
  },
  menuItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
});
