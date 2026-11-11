import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import BookCardWithBadge from './BookCardWithBadge';
import FloatingCartButton from './FloatingCartButton';
import { SAMPLE_BOOKS } from '../data';

export default function Gio3_Screen() {
  const [cartCount, setCartCount] = useState<number>(3);

  const handleAddCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    // Container ngoài cùng: flex 1 và position relative để nút nổi căn theo toàn màn hình
    <View style={styles.screenContainer}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>GIỜ 3: Position, AlignSelf &amp; Lớp phủ (Overlay)</Text>
          <Text style={styles.headerSub}>
            • Bài 1: Badge giảm giá / MỚI (position: 'absolute' trên bìa sách)
          </Text>
          <Text style={styles.headerSub}>
            • Bài 2: Nút giỏ hàng nổi (FAB) kèm badge số lượng lồng nhau
          </Text>
          <Text style={styles.headerSub}>
            • Bấm nút 🛒 nổi ở góc phải để tăng số lượng giỏ hàng thử nghiệm
          </Text>
        </View>

        {/* Lưới sách có Badge overlay */}
        <View style={styles.gridContainer}>
          {SAMPLE_BOOKS.map((book) => (
            <BookCardWithBadge key={book.id} book={book} />
          ))}
        </View>
      </ScrollView>

      {/* Bài 2: Nút giỏ hàng nổi FAB nằm ngoài ScrollView, luôn đè lên nội dung đáy phải */}
      <FloatingCartButton itemCount={cartCount} onPress={handleAddCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    // Yêu cầu kỹ thuật: flex: 1 và position: 'relative' làm containing block cho FAB
    flex: 1,
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
    // paddingBottom lớn để nội dung cuối không bị nút tròn giỏ hàng che khuất
    paddingBottom: 90,
  },
  headerBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  headerSub: {
    fontSize: 12,
    color: '#616161',
    marginTop: 2,
  },
  gridContainer: {
    // Lưới 2 cột: flexDirection 'row', flexWrap 'wrap', justifyContent 'space-between'
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
