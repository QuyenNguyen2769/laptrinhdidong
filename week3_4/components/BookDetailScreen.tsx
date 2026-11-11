import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Book, SAMPLE_BOOKS } from '../data';

interface BookDetailScreenProps {
  book?: Book;
  onBack?: () => void;
}

export default function BookDetailScreen({
  book = SAMPLE_BOOKS[0],
  onBack,
}: BookDetailScreenProps) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* 1. Header phụ đơn giản trên cùng */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>◀ Quay lại</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.headerTitle}>Chi tiết sách</Text>
        )}
        <Text style={styles.headerTitle} numberOfLines={1}>
          {book.title}
        </Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={{ fontSize: 18 }}>❤️</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Phần nội dung dài đặt trong ScrollView riêng (flex: 1) để không đẩy tràn thanh dưới */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Yêu cầu kỹ thuật: Ảnh bìa lớn căn giữa bằng alignSelf: 'center', aspectRatio giữ tỉ lệ */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: book.cover }}
            style={styles.largeCover}
            resizeMode="cover"
          />
        </View>

        {/* Thông tin chi tiết sách */}
        <View style={styles.infoSection}>
          <View style={styles.badgeRow}>
            <Text style={styles.categoryBadge}>{book.category}</Text>
            {book.discountBadge && (
              <Text style={styles.discountBadge}>{book.discountBadge}</Text>
            )}
          </View>

          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>Tác giả: <Text style={styles.bold}>{book.author}</Text></Text>

          {/* Đánh giá sao */}
          <View style={styles.ratingRow}>
            <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingScore}>4.9 (1.280 đánh giá)</Text>
          </View>

          {/* Giá tiền */}
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              {book.price.toLocaleString('vi-VN')} đ
            </Text>
            {book.originalPrice && (
              <Text style={styles.originalPrice}>
                {book.originalPrice.toLocaleString('vi-VN')} đ
              </Text>
            )}
          </View>

          {/* Mô tả dài cuộn được */}
          <View style={styles.descBox}>
            <Text style={styles.descTitle}>Giới thiệu nội dung</Text>
            <Text style={styles.descText}>
              {book.description}
            </Text>
            <Text style={styles.descTextExtra}>
              Tác phẩm mang lại những góc nhìn sâu sắc, truyền cảm hứng mạnh mẽ và đúc kết những bài học thực tiễn vô giá cho bất kỳ ai đang trên con đường hoàn thiện bản thân và chinh phục những mục tiêu lớn trong cuộc đời.
            </Text>
            <Text style={styles.descTextExtra}>
              • Nhà xuất bản: NXB Tổng Hợp TP.HCM{'\n'}
              • Năm xuất bản: 2026{'\n'}
              • Số trang: 320 trang{'\n'}
              • Hình thức: Bìa mềm cao cấp
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 3. Thanh 'Thêm vào giỏ' cố định dưới cùng màn hình (KHÔNG nằm trong ScrollView) */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Tạm tính:</Text>
          <Text style={styles.bottomPriceValue}>
            {book.price.toLocaleString('vi-VN')} đ
          </Text>
        </View>

        <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.85}>
          <Text style={styles.addToCartText}>🛒 Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    backgroundColor: '#ffffff',
  },
  backBtn: {
    paddingVertical: 6,
    paddingRight: 10,
  },
  backText: {
    color: '#1a237e',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
    textAlign: 'center',
  },
  shareBtn: {
    padding: 6,
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  imageCard: {
    // Yêu cầu kỹ thuật: alignSelf 'center', width theo %, aspectRatio giữ tỉ lệ
    alignSelf: 'center',
    width: '60%',
    aspectRatio: 3 / 4,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    marginBottom: 16,
  },
  largeCover: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    gap: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8eaf6',
    color: '#1a237e',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    lineHeight: 24,
  },
  author: {
    fontSize: 13,
    color: '#616161',
  },
  bold: {
    fontWeight: 'bold',
    color: '#212121',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 2,
  },
  stars: {
    fontSize: 14,
  },
  ratingScore: {
    fontSize: 12,
    color: '#757575',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginTop: 4,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  originalPrice: {
    fontSize: 13,
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
  descBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    gap: 8,
  },
  descTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  descText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
  },
  descTextExtra: {
    fontSize: 13,
    color: '#616161',
    lineHeight: 20,
  },
  bottomBar: {
    // Yêu cầu kỹ thuật: flexDirection row, space-between, cố định đáy màn hình, KHÔNG nằm trong ScrollView
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomPriceCol: {
    gap: 2,
  },
  bottomPriceLabel: {
    fontSize: 11,
    color: '#757575',
  },
  bottomPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  addToCartBtn: {
    backgroundColor: '#1a237e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
