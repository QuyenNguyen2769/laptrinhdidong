import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../data';

interface BookCardRowProps {
  book: Book;
}

export default function BookCardRow({ book }: BookCardRowProps) {
  return (
    <View style={styles.cardContainer}>
      {/* 1. Ảnh bìa bên trái kích thước cố định 80x110 */}
      <Image
        source={{ uri: book.cover }}
        style={styles.coverImage}
        resizeMode="cover"
      />

      {/* 2. Cột thông tin bên phải chiếm hết phần không gian còn lại (flex: 1) */}
      <View style={styles.infoColumn}>
        <View style={styles.topInfo}>
          {/* Tên sách: numberOfLines={2} để không lệch layout */}
          <Text style={styles.bookTitle} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.authorText}>Tác giả: {book.author}</Text>
          <Text style={styles.categoryBadge}>{book.category}</Text>
        </View>

        {/* 3. Giá tiền căn dưới cùng bằng justifyContent: space-between */}
        <View style={styles.bottomInfo}>
          <Text style={styles.priceText}>{book.price.toLocaleString('vi-VN')} đ</Text>
          {book.originalPrice && (
            <Text style={styles.originalPriceText}>
              {book.originalPrice.toLocaleString('vi-VN')} đ
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    // Yêu cầu: Card ngoài cùng flexDirection: 'row'
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 12,
  },
  coverImage: {
    // Kích thước cố định 80x110 theo đúng spec
    width: 80,
    height: 110,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  infoColumn: {
    // Chiếm phần không gian còn lại
    flex: 1,
    height: 110, // Đồng bộ chiều cao với ảnh để justifyContent 'space-between' đẩy giá xuống đáy
    flexDirection: 'column',
    justifyContent: 'space-between', // Đẩy phần trên lên đỉnh, giá tiền xuống đáy
  },
  topInfo: {
    gap: 4,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212121',
    lineHeight: 20,
  },
  authorText: {
    fontSize: 13,
    color: '#616161',
  },
  categoryBadge: {
    fontSize: 11,
    color: '#1a237e',
    backgroundColor: '#e8eaf6',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f', // Màu đỏ nổi bật cho giá tiền
  },
  originalPriceText: {
    fontSize: 12,
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
});
