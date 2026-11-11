import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FloatingCartButtonProps {
  itemCount?: number;
  onPress?: () => void;
}

export default function FloatingCartButton({
  itemCount = 3,
  onPress,
}: FloatingCartButtonProps) {
  return (
    // Containing block ngoài cùng của nút tròn
    <TouchableOpacity style={styles.floatingButton} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.cartIcon}>🛒</Text>

      {/* Badge số lượng: position 'absolute' đặt ở góc trên-phải của chính nút tròn (containing block lồng nhau) */}
      {itemCount > 0 && (
        <View style={styles.badgeCountContainer}>
          <Text style={styles.badgeCountText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    // Yêu cầu kỹ thuật: position 'absolute', bottom 24, right 20, width/height bằng nhau, borderRadius = width/2
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29, // Tạo hình tròn hoàn hảo
    backgroundColor: '#1a237e', // Màu indigo thương hiệu
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Đảm bảo luôn đè lên nội dung cuộn bên dưới
    elevation: 6, // Đổ bóng nổi rõ trên Android
    shadowColor: '#000', // Đổ bóng trên iOS/Web
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cartIcon: {
    fontSize: 26,
  },
  badgeCountContainer: {
    // Yêu cầu: position 'absolute' ở góc trên-phải của nút tròn
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#d32f2f', // Màu đỏ cảnh báo
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#ffffff', // Viền trắng phân cách nổi bật
  },
  badgeCountText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
