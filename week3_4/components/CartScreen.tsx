import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { SAMPLE_BOOKS, CartItem } from '../data';
import BottomTabBar, { TabKey } from './BottomTabBar';

interface CartScreenProps {
  currentTab?: TabKey;
  onSelectTab?: (tab: TabKey) => void;
}

export default function CartScreen({
  currentTab = 'cart',
  onSelectTab = () => {},
}: CartScreenProps) {
  // Dữ liệu giỏ hàng mẫu
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { book: SAMPLE_BOOKS[0], quantity: 1 },
    { book: SAMPLE_BOOKS[1], quantity: 2 },
    { book: SAMPLE_BOOKS[3], quantity: 1 },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.book.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Tính tổng số lượng và tổng tiền
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header giỏ hàng */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ Hàng Của Bạn ({totalQuantity})</Text>
      </View>

      {/* VÙNG 1: Danh sách sản phẩm trong giỏ cuộn được (flex: 1) */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartBox}>
            <Text style={{ fontSize: 48 }}>🛒</Text>
            <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
          </View>
        ) : (
          cartItems.map((item) => (
            // Yêu cầu kỹ thuật: Mỗi dòng flexDirection: 'row', alignItems: 'center'
            <View key={item.book.id} style={styles.cartRow}>
              {/* Ảnh bìa nhỏ cố định kích thước 60x80 */}
              <Image source={{ uri: item.book.cover }} style={styles.bookThumb} />

              {/* Tên sách: flex: 1 để chiếm không gian linh hoạt */}
              <View style={styles.bookInfoCol}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {item.book.title}
                </Text>
                <Text style={styles.bookAuthor}>{item.book.author}</Text>
                <Text style={styles.bookPrice}>
                  {item.book.price.toLocaleString('vi-VN')} đ
                </Text>
              </View>

              {/* Bộ điều khiển số lượng (width cố định) */}
              <View style={styles.qtyControlBox}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.book.id, -1)}
                >
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.book.id, 1)}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* VÙNG 2: Thanh tổng tiền + nút 'Thanh toán' CỐ ĐỊNH phía dưới (KHÔNG cuộn, nằm ngay trên Tab Bar) */}
      <View style={styles.checkoutBar}>
        <View style={styles.totalCol}>
          <Text style={styles.totalLabel}>Tổng cộng ({totalQuantity} cuốn):</Text>
          <Text style={styles.totalAmount}>
            {totalPrice.toLocaleString('vi-VN')} đ
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutBtn, cartItems.length === 0 && styles.disabledBtn]}
          disabled={cartItems.length === 0}
          activeOpacity={0.85}
        >
          <Text style={styles.checkoutBtnText}>Thanh Toán ▶</Text>
        </TouchableOpacity>
      </View>

      {/* VÙNG 3: Bottom Tab Bar cố định ở đáy cùng */}
      <BottomTabBar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        cartCount={totalQuantity}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a237e',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scrollArea: {
    flex: 1, // Vùng cuộn ở giữa chiếm trọn không gian còn lại
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 12,
    gap: 10,
  },
  emptyCartBox: {
    padding: 40,
    alignItems: 'center',
    gap: 10,
  },
  emptyText: {
    fontSize: 15,
    color: '#757575',
    fontWeight: '500',
  },
  cartRow: {
    // Yêu cầu: flexDirection row, alignItems center
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 12,
  },
  bookThumb: {
    // Ảnh nhỏ cố định kích thước
    width: 60,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  bookInfoCol: {
    // Tên flex: 1 để tự co giãn
    flex: 1,
    gap: 4,
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#212121',
    lineHeight: 18,
  },
  bookAuthor: {
    fontSize: 11,
    color: '#757575',
  },
  bookPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  qtyControlBox: {
    // Số lượng cố định bên phải
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    padding: 2,
    gap: 6,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  qtyBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  qtyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#212121',
    minWidth: 16,
    textAlign: 'center',
  },
  checkoutBar: {
    // Yêu cầu: Thanh tổng tiền cố định KHÔNG cuộn, nằm ngay trên Tab Bar
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 4,
  },
  totalCol: {
    gap: 2,
  },
  totalLabel: {
    fontSize: 11,
    color: '#757575',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  checkoutBtn: {
    backgroundColor: '#ff6f00', // Màu cam nổi bật kích thích mua hàng
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledBtn: {
    backgroundColor: '#bdbdbd',
  },
  checkoutBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
