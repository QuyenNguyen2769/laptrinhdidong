import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../data';

interface BookCardGridProps {
  book: Book;
  columns?: 2 | 3;
}

export default function BookCardGrid({ book, columns = 2 }: BookCardGridProps) {
  const isThreeCols = columns === 3;

  return (
    <View style={[styles.card, isThreeCols ? styles.cardCol3 : styles.cardCol2]}>
      {/* 1. Ảnh bìa: width 100%, giữ tỉ lệ chuẩn aspectRatio 3/4 */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: book.cover }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      </View>

      {/* 2. Phần thông tin phía dưới */}
      <View style={styles.content}>
        <Text style={[styles.title, isThreeCols && styles.titleSmall]} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <Text style={[styles.price, isThreeCols && styles.priceSmall]}>
          {book.price.toLocaleString('vi-VN')} đ
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    marginBottom: 12,
  },
  cardCol2: {
    // 2 cột: chia xấp xỉ 48% để kết hợp với gap hoặc space-between
    width: '48%',
  },
  cardCol3: {
    // 3 cột (Thử thách giờ 2): chia xấp xỉ 31%
    width: '31%',
  },
  imageWrapper: {
    width: '100%',
    // Yêu cầu: aspectRatio cố định 3/4 thay vì set height cố định
    aspectRatio: 3 / 4,
    backgroundColor: '#f5f5f5',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 8,
    gap: 3,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#212121',
    lineHeight: 18,
  },
  titleSmall: {
    fontSize: 11,
    lineHeight: 15,
  },
  author: {
    fontSize: 11,
    color: '#757575',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginTop: 2,
  },
  priceSmall: {
    fontSize: 12,
  },
});
