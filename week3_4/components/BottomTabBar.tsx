import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type TabKey = 'home' | 'categories' | 'cart' | 'profile';

interface TabItem {
  key: TabKey;
  label: string;
  icon: string;
  badge?: number;
}

interface BottomTabBarProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  cartCount?: number;
}

export default function BottomTabBar({
  currentTab,
  onSelectTab,
  cartCount = 3,
}: BottomTabBarProps) {
  const tabs: TabItem[] = [
    { key: 'home', label: 'Trang chủ', icon: '🏠' },
    { key: 'categories', label: 'Danh mục', icon: '📂' },
    { key: 'cart', label: 'Giỏ hàng', icon: '🛒', badge: cartCount },
    { key: 'profile', label: 'Tài khoản', icon: '👤' },
  ];

  return (
    // Yêu cầu kỹ thuật: flexDirection 'row', mỗi mục flex: 1 chia đều 4 phần
    <View style={styles.tabBarContainer}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onSelectTab(tab.key)}
            activeOpacity={0.7}
          >
            {/* Vùng icon kèm badge số lượng nếu có */}
            <View style={styles.iconContainer}>
              <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                {tab.icon}
              </Text>
              {tab.badge && tab.badge > 0 ? (
                <View style={styles.badgeCount}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              ) : null}
            </View>

            {/* Chữ phía dưới, mục đang chọn màu nổi bật */}
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    // Yêu cầu kỹ thuật: flexDirection 'row', cố định đáy, height ~58
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabItem: {
    // Yêu cầu kỹ thuật: flex: 1 chia đều 4 phần, flexDirection: 'column', căn giữa
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  badgeCount: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#d32f2f',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  tabLabel: {
    fontSize: 11,
    color: '#757575',
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#1a237e', // Màu indigo nổi bật khi được chọn
    fontWeight: 'bold',
  },
});
