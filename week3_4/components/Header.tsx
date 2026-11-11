import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      {/* Logo / Tên app bên trái */}
      <View style={styles.leftContainer}>
        <Text style={styles.logoIcon}>📚</Text>
        <Text style={styles.brandTitle}>BookStore</Text>
      </View>

      {/* 2 icon tìm kiếm và giỏ hàng bên phải */}
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🛒</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // Yêu cầu kỹ thuật: flexDirection row, space-between, alignItems center
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#1a237e', // Nền màu navy / indigo chuẩn
    elevation: 4, // Đổ bóng nhẹ trên Android
    shadowColor: '#000', // Đổ bóng trên iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    fontSize: 22,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  rightIconsContainer: {
    // Hai icon bên phải đặt trong 1 View con flexDirection row kèm khoảng cách
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconButton: {
    padding: 6,
  },
  iconText: {
    fontSize: 20,
  },
});
