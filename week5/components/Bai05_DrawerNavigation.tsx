import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width > 500 ? 320 : width * 0.78;

export default function Bai05_DrawerNavigation() {
  // Quản lý Drawer đang mở hay đóng
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Màn hình đang chọn trong Drawer: 'HOME' | 'PROFILE' | 'SETTINGS'
  const [currentScreen, setCurrentScreen] = useState<'HOME' | 'PROFILE' | 'SETTINGS'>('HOME');

  // Cài đặt Settings bằng Switch
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState<boolean>(true);
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState<boolean>(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const selectScreen = (screen: 'HOME' | 'PROFILE' | 'SETTINGS') => {
    setCurrentScreen(screen);
    setIsDrawerOpen(false);
  };

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      {/* ================= TOP NAVIGATION BAR ================= */}
      <View style={[styles.navBar, themeStyles.navBar]}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer} activeOpacity={0.7}>
          <Text style={[styles.menuIcon, themeStyles.menuIcon]}>☰</Text>
        </TouchableOpacity>

        <Text style={[styles.navTitle, themeStyles.navTitle]}>
          {currentScreen === 'HOME' && '🏠 Trang Chủ (Home)'}
          {currentScreen === 'PROFILE' && '👤 Thông Tin Người Dùng'}
          {currentScreen === 'SETTINGS' && '⚙️ Cài Đặt Hệ Thống'}
        </Text>

        <TouchableOpacity onPress={() => setIsDrawerOpen(true)} style={styles.drawerQuickPill}>
          <Text style={styles.drawerQuickText}>Menu</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MAIN CONTENT ================= */}
      <ScrollView contentContainerStyle={styles.mainContent}>
        {/* Banner hướng dẫn kéo hoặc bấm Menu */}
        <TouchableOpacity style={[styles.drawerHintBanner, isDarkMode && styles.drawerHintBannerDark]} onPress={toggleDrawer}>
          <Text style={[styles.drawerHintText, isDarkMode && styles.drawerHintTextDark]}>
            💡 Nhấn nút <Text style={styles.boldText}>☰</Text> góc trên để mở ngăn kéo Drawer Navigation
          </Text>
        </TouchableOpacity>

        {/* 1. MÀN HÌNH HOME */}
        {currentScreen === 'HOME' && (
          <View style={[styles.screenCard, themeStyles.card]}>
            <Text style={[styles.welcomeTitle, themeStyles.textPrimary]}>
              Chào mừng bạn đến với ứng dụng!
            </Text>
            <Text style={[styles.simpleText, themeStyles.textSecondary]}>
              Đây là Màn hình Home (Màn hình chính) của ứng dụng theo yêu cầu bài tập Drawer Navigation.
            </Text>

            <View style={[styles.featureBox, isDarkMode && styles.featureBoxDark]}>
              <Text style={[styles.featureBoxTitle, isDarkMode && styles.featureBoxTitleDark]}>Tính năng nổi bật:</Text>
              <Text style={[styles.featureItem, themeStyles.textSecondary]}>• Thanh Drawer kéo mượt mà từ cạnh trái</Text>
              <Text style={[styles.featureItem, themeStyles.textSecondary]}>• Hỗ trợ chuyển đổi linh hoạt 3 màn hình</Text>
              <Text style={[styles.featureItem, themeStyles.textSecondary]}>• Chuyển đổi Dark Mode toàn diện bằng Switch</Text>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.navQuickBtn} onPress={() => selectScreen('PROFILE')}>
                <Text style={styles.navQuickBtnText}>Xem Profile ➔</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navQuickBtn, { backgroundColor: '#388E3C' }]} onPress={() => selectScreen('SETTINGS')}>
                <Text style={styles.navQuickBtnText}>Cài đặt ➔</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 2. MÀN HÌNH PROFILE */}
        {currentScreen === 'PROFILE' && (
          <View style={[styles.screenCard, themeStyles.card]}>
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatar}>
                <Text style={styles.avatarInitials}>QN</Text>
              </View>
              <Text style={[styles.profileFullName, themeStyles.textPrimary]}>Nguyễn Như Ngọc Quyên</Text>
              <Text style={styles.profileStudentId}>MSSV: 23663981</Text>
              <Text style={[styles.profileRole, themeStyles.textSecondary]}>Sinh viên Đại học Công Nghiệp TP.HCM</Text>
            </View>

            <View style={styles.detailsList}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, themeStyles.textSecondary]}>Email:</Text>
                <Text style={[styles.detailValue, themeStyles.textPrimary]}>quyennguyen2769@gmail.com</Text>
              </View>
              <View style={[styles.divider, themeStyles.divider]} />
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, themeStyles.textSecondary]}>Ngành học:</Text>
                <Text style={[styles.detailValue, themeStyles.textPrimary]}>Kỹ thuật Phần mềm / CNTT</Text>
              </View>
              <View style={[styles.divider, themeStyles.divider]} />
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, themeStyles.textSecondary]}>Học phần:</Text>
                <Text style={[styles.detailValue, themeStyles.textPrimary]}>Lập trình Thiết bị Di động (LTDD)</Text>
              </View>
              <View style={[styles.divider, themeStyles.divider]} />
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, themeStyles.textSecondary]}>Trạng thái:</Text>
                <Text style={[styles.detailValue, { color: '#4CAF50', fontWeight: 'bold' }]}>Đang hoạt động</Text>
              </View>
            </View>
          </View>
        )}

        {/* 3. MÀN HÌNH SETTINGS (SWITCH BẬT/TẮT) */}
        {currentScreen === 'SETTINGS' && (
          <View style={[styles.screenCard, themeStyles.card]}>
            <Text style={[styles.settingsHeaderTitle, themeStyles.textPrimary]}>Cài đặt Tuỳ chọn</Text>
            <Text style={[styles.settingsHeaderSub, themeStyles.textSecondary]}>
              Sử dụng các Switch để thay đổi thiết lập hệ thống
            </Text>

            {/* Tuỳ chọn 1: Dark Mode */}
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={[styles.switchTitle, themeStyles.textPrimary]}>🌙 Chế độ tối (Dark Mode)</Text>
                <Text style={[styles.switchDesc, themeStyles.textSecondary]}>
                  {isDarkMode ? 'Đang bật nền tối (Dark Mode ON)' : 'Đang bật nền sáng (Light Mode ON)'}
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDarkMode ? '#2979FF' : '#f4f3f4'}
              />
            </View>

            <View style={[styles.divider, themeStyles.divider]} />

            {/* Tuỳ chọn 2: Notifications */}
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={[styles.switchTitle, themeStyles.textPrimary]}>🔔 Nhận thông báo (Push Notifications)</Text>
                <Text style={[styles.switchDesc, themeStyles.textSecondary]}>
                  {isNotificationsEnabled ? 'Thông báo đang được bật' : 'Đã tắt âm thanh & thông báo'}
                </Text>
              </View>
              <Switch
                value={isNotificationsEnabled}
                onValueChange={setIsNotificationsEnabled}
                trackColor={{ false: '#767577', true: '#81c784' }}
                thumbColor={isNotificationsEnabled ? '#4CAF50' : '#f4f3f4'}
              />
            </View>

            <View style={[styles.divider, themeStyles.divider]} />

            {/* Tuỳ chọn 3: Auto Sync */}
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={[styles.switchTitle, themeStyles.textPrimary]}>🔄 Tự động đồng bộ (Auto Sync)</Text>
                <Text style={[styles.switchDesc, themeStyles.textSecondary]}>
                  {isAutoSyncEnabled ? 'Tự động sao lưu dữ liệu nền' : 'Tắt để tiết kiệm pin'}
                </Text>
              </View>
              <Switch
                value={isAutoSyncEnabled}
                onValueChange={setIsAutoSyncEnabled}
                trackColor={{ false: '#767577', true: '#ffd54f' }}
                thumbColor={isAutoSyncEnabled ? '#FF9800' : '#f4f3f4'}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* ================= DRAWER OVERLAY & SIDEBAR ================= */}
      {isDrawerOpen && (
        <View style={styles.drawerBackdrop}>
          <TouchableOpacity style={styles.backdropTouch} onPress={() => setIsDrawerOpen(false)} activeOpacity={1} />

          <View style={[styles.drawerMenu, { width: DRAWER_WIDTH }]}>
            {/* Drawer Header */}
            <View style={styles.drawerHeaderBox}>
              <View style={styles.drawerAvatar}>
                <Text style={styles.drawerAvatarText}>QN</Text>
              </View>
              <Text style={styles.drawerUserName}>Nguyễn Như Ngọc Quyên</Text>
              <Text style={styles.drawerUserSub}>MSSV: 23663981</Text>
              <Text style={styles.drawerUserEmail}>quyennguyen2769@gmail.com</Text>
            </View>

            {/* Drawer Navigation Items */}
            <View style={styles.drawerNavList}>
              <TouchableOpacity
                style={[styles.drawerItem, currentScreen === 'HOME' && styles.drawerItemActive]}
                onPress={() => selectScreen('HOME')}
              >
                <Text style={styles.drawerItemIcon}>🏠</Text>
                <Text style={[styles.drawerItemText, currentScreen === 'HOME' && styles.drawerItemTextActive]}>
                  Màn hình 1: Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.drawerItem, currentScreen === 'PROFILE' && styles.drawerItemActive]}
                onPress={() => selectScreen('PROFILE')}
              >
                <Text style={styles.drawerItemIcon}>👤</Text>
                <Text style={[styles.drawerItemText, currentScreen === 'PROFILE' && styles.drawerItemTextActive]}>
                  Màn hình 2: Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.drawerItem, currentScreen === 'SETTINGS' && styles.drawerItemActive]}
                onPress={() => selectScreen('SETTINGS')}
              >
                <Text style={styles.drawerItemIcon}>⚙️</Text>
                <Text style={[styles.drawerItemText, currentScreen === 'SETTINGS' && styles.drawerItemTextActive]}>
                  Màn hình 3: Settings (Switch)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Drawer Footer */}
            <View style={styles.drawerFooter}>
              <TouchableOpacity style={styles.closeDrawerBtn} onPress={() => setIsDrawerOpen(false)}>
                <Text style={styles.closeDrawerText}>Đóng Drawer ✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F5F7',
  },
  navBar: {
    backgroundColor: '#00695C',
  },
  menuIcon: {
    color: '#ffffff',
  },
  navTitle: {
    color: '#ffffff',
  },
  textPrimary: {
    color: '#212121',
  },
  textSecondary: {
    color: '#616161',
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  divider: {
    backgroundColor: '#EEEEEE',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  navBar: {
    backgroundColor: '#1A1A1A',
  },
  menuIcon: {
    color: '#80CBC4',
  },
  navTitle: {
    color: '#FFFFFF',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#B0BEC5',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderColor: '#37474F',
    borderWidth: 1,
  },
  divider: {
    backgroundColor: '#37474F',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuButton: {
    padding: 6,
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerQuickPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  drawerQuickText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  mainContent: {
    padding: 16,
    paddingBottom: 40,
  },
  drawerHintBanner: {
    backgroundColor: '#E0F2F1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00695C',
  },
  drawerHintBannerDark: {
    backgroundColor: '#1B2E2B',
    borderLeftColor: '#80CBC4',
  },
  drawerHintText: {
    fontSize: 13,
    color: '#004D40',
  },
  drawerHintTextDark: {
    color: '#80CBC4',
  },
  boldText: {
    fontWeight: 'bold',
  },
  screenCard: {
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  simpleText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  featureBox: {
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 8,
    marginBottom: 18,
  },
  featureBoxDark: {
    backgroundColor: '#262626',
  },
  featureBoxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00695C',
    marginBottom: 6,
  },
  featureBoxTitleDark: {
    color: '#80CBC4',
  },
  featureItem: {
    fontSize: 13,
    color: '#424242',
    lineHeight: 20,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  navQuickBtn: {
    flex: 1,
    backgroundColor: '#00695C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  navQuickBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  // PROFILE STYLES
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00695C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarInitials: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileFullName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileStudentId: {
    fontSize: 14,
    color: '#00695C',
    fontWeight: '600',
    marginTop: 2,
  },
  profileRole: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  detailsList: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#757575',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },

  // SETTINGS STYLES
  settingsHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingsHeaderSub: {
    fontSize: 13,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchInfo: {
    flex: 1,
    paddingRight: 10,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  switchDesc: {
    fontSize: 12,
  },

  // DRAWER MENU STYLES
  drawerBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    zIndex: 999,
  },
  backdropTouch: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawerMenu: {
    backgroundColor: '#ffffff',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 16,
    zIndex: 1000,
  },
  drawerHeaderBox: {
    backgroundColor: '#004D40',
    padding: 20,
    paddingTop: 40,
  },
  drawerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#80CBC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  drawerAvatarText: {
    color: '#004D40',
    fontSize: 22,
    fontWeight: 'bold',
  },
  drawerUserName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerUserSub: {
    color: '#B2DFDB',
    fontSize: 13,
    marginTop: 2,
  },
  drawerUserEmail: {
    color: '#E0F2F1',
    fontSize: 12,
    marginTop: 2,
  },
  drawerNavList: {
    paddingVertical: 10,
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  drawerItemActive: {
    backgroundColor: '#E0F2F1',
    borderLeftWidth: 4,
    borderLeftColor: '#00695C',
  },
  drawerItemIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  drawerItemText: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  drawerItemTextActive: {
    color: '#00695C',
    fontWeight: 'bold',
  },
  drawerFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  closeDrawerBtn: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeDrawerText: {
    color: '#616161',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
