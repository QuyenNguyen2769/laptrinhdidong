import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Header from './Header';
import CategoryChips from './CategoryChips';
import BookCardWithBadge from './BookCardWithBadge';
import FloatingCartButton from './FloatingCartButton';
import { SAMPLE_BOOKS, Book } from '../data';

interface HomeScreenProps {
  onSelectBook?: (book: Book) => void;
}

export default function HomeScreen({ onSelectBook }: HomeScreenProps) {
  const [cartCount, setCartCount] = useState<number>(3);

  return (
    // 1. Cấu trúc chuẩn: SafeAreaView (flex: 1)
    <SafeAreaView style={styles.safeContainer}>
      {/* 2. Header cố định trên cùng màn hình (KHÔNG nằm trong ScrollView) */}
      <Header />

      {/* 3. Vùng nội dung cuộn ở giữa (ScrollView flex: 1) */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner khuyến mãi nổi bật */}
        <View style={styles.promoBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoBadge}>ƯU ĐÃI ĐẶC BIỆT</Text>
            <Text style={styles.promoTitle}>Hội Sách Mùa Thu 2026</Text>
            <Text style={styles.promoSub}>Giảm tới 40% cho tất cả đầu sách hay</Text>
          </View>
          <Text style={{ fontSize: 40 }}>📖</Text>
        </View>

        {/* Danh mục sách dạng chip (Giờ 2) */}
        <CategoryChips />

        {/* Tiêu đề mục sách */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>🔥 Sách Nổi Bật &amp; Bán Chạy</Text>
          <Text style={styles.seeAllText}>Xem tất cả ▶</Text>
        </View>

        {/* Lưới sách 2 cột kèm Badge (Giờ 3) */}
        <View style={styles.gridContainer}>
          {SAMPLE_BOOKS.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={{ width: '48%' }}
              onPress={() => onSelectBook?.(book)}
              activeOpacity={0.8}
            >
              <BookCardWithBadge book={book} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 4. Nút giỏ hàng nổi FAB nằm ngoài ScrollView, song song cùng cấp */}
      <FloatingCartButton
        itemCount={cartCount}
        onPress={() => setCartCount((prev) => prev + 1)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1a237e', // Đồng màu với header
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 12,
    // Yêu cầu kỹ thuật: paddingBottom đủ lớn để nút nổi không che mất sách cuối cùng
    paddingBottom: 95,
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#283593',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  promoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffb300',
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  promoSub: {
    fontSize: 12,
    color: '#e8eaf6',
    marginTop: 2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  seeAllText: {
    fontSize: 12,
    color: '#3949ab',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
