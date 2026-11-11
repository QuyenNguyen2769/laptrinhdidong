import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../data';

interface BookCardWithBadgeProps {
  book: Book;
}

export default function BookCardWithBadge({ book }: BookCardWithBadgeProps) {
  const isNew = book.discountBadge === 'MỚI';

  return (
    <View style={styles.card}>
      {/* 1. View chứa ảnh bìa: position 'relative' để làm containing block */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: book.cover }}
          style={styles.coverImage}
          resizeMode="cover"
        />

        {/* 2. Badge giảm giá / nhãn Mới: position 'absolute', top: 6, left: 6 */}
        {book.discountBadge && (
          <View style={[styles.badge, isNew ? styles.badgeNew : styles.badgeDiscount]}>
            <Text style={styles.badgeText}>{book.discountBadge}</Text>
          </View>
        )}
      </View>

      {/* 3. Phần thông tin phía dưới */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{book.price.toLocaleString('vi-VN')} đ</Text>
          {book.originalPrice && (
            <Text style={styles.originalPrice}>
              {book.originalPrice.toLocaleString('vi-VN')} đ
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    marginBottom: 12,
  },
  imageContainer: {
    // Yêu cầu kỹ thuật: position 'relative' làm containing block cho Badge
    position: 'relative',
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#f5f5f5',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    // Yêu cầu kỹ thuật: position 'absolute', top 6, left 6, đè lên ảnh
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 2,
    elevation: 3,
  },
  badgeDiscount: {
    backgroundColor: '#d32f2f', // Đỏ nổi bật cho giảm giá
  },
  badgeNew: {
    backgroundColor: '#f57c00', // Cam tươi cho nhãn 'MỚI'
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
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
  author: {
    fontSize: 11,
    color: '#757575',
  },
  priceRow: {
    marginTop: 3,
    gap: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  originalPrice: {
    fontSize: 11,
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
});
