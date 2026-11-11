import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

interface TechnologyItem {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  views: number;
}

const TECH_NEWS: TechnologyItem[] = [
  {
    id: '1',
    title: 'React Native 0.81 phát hành với New Architecture mặc định',
    category: 'Mobile Dev',
    description: 'Kiến trúc mới mang lại hiệu năng vượt trội với TurboModules và Fabric renderer mượt mà.',
    date: '10/11/2026',
    views: 1250,
  },
  {
    id: '2',
    title: 'Expo Router v4: Định tuyến File-based thế hệ mới',
    category: 'Framework',
    description: 'Hỗ trợ Nested Tabs, Stack, Drawer và Deeplinking hoàn toàn tự động chỉ qua cấu trúc thư mục.',
    date: '08/11/2026',
    views: 940,
  },
  {
    id: '3',
    title: 'TypeScript 5.9: Tối ưu hóa kiểm tra kiểu dữ liệu cực nhanh',
    category: 'TypeScript',
    description: 'Cải tiến hiệu năng biên dịch và mở rộng tính năng Generic Inference cho React components.',
    date: '05/11/2026',
    views: 2100,
  },
  {
    id: '4',
    title: 'Vsmart Joy 3 và chiến lược smartphone giá rẻ tại Việt Nam',
    category: 'Thiết bị',
    description: 'Dòng điện thoại quốc dân trang bị chip Snapdragon 632 cùng viên pin khủng 5000mAh.',
    date: '02/11/2026',
    views: 3420,
  },
  {
    id: '5',
    title: 'Tối ưu FlatList và VirtualizedList trong ứng dụng thương mại điện tử',
    category: 'Tips & Tricks',
    description: 'Kỹ thuật dùng getItemLayout, windowSize và memo hóa renderItem để đạt 60fps chuẩn.',
    date: '01/11/2026',
    views: 1870,
  },
];

export default function Bai03_BottomTabNavigation() {
  // Quản lý tab hiện tại: 'HOME' | 'SEARCH' | 'PROFILE'
  const [activeTab, setActiveTab] = useState<'HOME' | 'SEARCH' | 'PROFILE'>('HOME');

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNews = TECH_NEWS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {activeTab === 'HOME' && '🏠 Khám Phá Tin Tức (Home)'}
          {activeTab === 'SEARCH' && '🔍 Tìm Kiếm Thông Tin'}
          {activeTab === 'PROFILE' && '👤 Hồ Sơ Cá Nhân'}
        </Text>
      </View>

      {/* Main Content Area based on Tab */}
      <View style={styles.content}>
        {/* ================= TAB 1: HOME ================= */}
        {activeTab === 'HOME' && (
          <View style={styles.tabContainer}>
            <View style={styles.bannerBox}>
              <Text style={styles.bannerTitle}>Bản tin Công nghệ & Lập trình Di động</Text>
              <Text style={styles.bannerSub}>Danh sách tin tức mới nhất hiển thị bằng FlatList</Text>
            </View>

            <FlatList
              data={TECH_NEWS}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listPadding}
              renderItem={({ item }) => (
                <View style={styles.newsCard}>
                  <View style={styles.cardHeader}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.category}</Text>
                    </View>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.viewsText}>👁 {item.views} lượt đọc</Text>
                    <TouchableOpacity style={styles.readMoreBtn}>
                      <Text style={styles.readMoreText}>Đọc tiếp →</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        {/* ================= TAB 2: SEARCH ================= */}
        {activeTab === 'SEARCH' && (
          <View style={styles.tabContainer}>
            {/* Search Input */}
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Nhập từ khóa tìm kiếm (React, Expo, vsmart...)"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                  <Text style={styles.clearBtnText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.searchMeta}>
              <Text style={styles.searchResultCount}>
                Kết quả tìm kiếm: <Text style={styles.bold}>{filteredNews.length}</Text> bài viết
              </Text>
            </View>

            <FlatList
              data={filteredNews}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listPadding}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyIcon}>📂</Text>
                  <Text style={styles.emptyText}>Không tìm thấy kết quả nào phù hợp với "{searchQuery}"</Text>
                </View>
              }
              renderItem={({ item }) => (
                <View style={styles.searchResultCard}>
                  <Text style={styles.searchCategory}>{item.category}</Text>
                  <Text style={styles.searchTitle}>{item.title}</Text>
                  <Text style={styles.searchDesc}>{item.description}</Text>
                </View>
              )}
            />
          </View>
        )}

        {/* ================= TAB 3: PROFILE ================= */}
        {activeTab === 'PROFILE' && (
          <View style={styles.profileContainer}>
            {/* Avatar & Basic Info */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>QN</Text>
              </View>
              <View style={styles.onlineDot} />
            </View>

            <Text style={styles.profileName}>Nguyễn Như Ngọc Quyên</Text>
            <Text style={styles.profileMssv}>MSSV: 23663981</Text>
            <Text style={styles.profileEmail}>quyennguyen2769@gmail.com</Text>

            {/* Thông tin học phần */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Môn học:</Text>
                <Text style={styles.infoValue}>Lập trình Thiết bị Di động</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Học phần:</Text>
                <Text style={styles.infoValue}>Tuần 5 - Expo Router & Navigation</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Khoa:</Text>
                <Text style={styles.infoValue}>Công nghệ Thông tin</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Trường:</Text>
                <Text style={styles.infoValue}>ĐH Công Nghiệp TP.HCM (IUH)</Text>
              </View>
            </View>

            {/* Nút hành động */}
            <TouchableOpacity style={styles.editProfileBtn}>
              <Text style={styles.editProfileText}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ================= BOTTOM TAB BAR ================= */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'HOME' && styles.activeTabButton]}
          onPress={() => setActiveTab('HOME')}
        >
          <Text style={[styles.tabIcon, activeTab === 'HOME' && styles.activeTabIcon]}>🏠</Text>
          <Text style={[styles.tabLabel, activeTab === 'HOME' && styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'SEARCH' && styles.activeTabButton]}
          onPress={() => setActiveTab('SEARCH')}
        >
          <Text style={[styles.tabIcon, activeTab === 'SEARCH' && styles.activeTabIcon]}>🔍</Text>
          <Text style={[styles.tabLabel, activeTab === 'SEARCH' && styles.activeTabLabel]}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'PROFILE' && styles.activeTabButton]}
          onPress={() => setActiveTab('PROFILE')}
        >
          <Text style={[styles.tabIcon, activeTab === 'PROFILE' && styles.activeTabIcon]}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === 'PROFILE' && styles.activeTabLabel]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
  },
  bannerBox: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1E88E5',
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  bannerSub: {
    fontSize: 12,
    color: '#1565C0',
    marginTop: 2,
  },
  listPadding: {
    padding: 12,
    paddingBottom: 20,
  },
  newsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212121',
    lineHeight: 20,
    marginBottom: 6,
  },
  newsDesc: {
    fontSize: 13,
    color: '#616161',
    lineHeight: 18,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
  },
  viewsText: {
    fontSize: 12,
    color: '#757575',
  },
  readMoreBtn: {
    paddingVertical: 4,
  },
  readMoreText: {
    color: '#1E88E5',
    fontWeight: '600',
    fontSize: 13,
  },

  // SEARCH STYLES
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: '#000',
  },
  clearBtn: {
    padding: 6,
  },
  clearBtnText: {
    color: '#999',
    fontSize: 14,
  },
  searchMeta: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  searchResultCount: {
    fontSize: 13,
    color: '#616161',
  },
  bold: {
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  searchResultCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#42A5F5',
  },
  searchCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E88E5',
    marginBottom: 2,
  },
  searchTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  searchDesc: {
    fontSize: 12,
    color: '#616161',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
  },

  // PROFILE STYLES
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#BBDEFB',
  },
  avatarInitials: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#00C853',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  profileMssv: {
    fontSize: 14,
    color: '#1E88E5',
    fontWeight: '600',
    marginTop: 2,
  },
  profileEmail: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
    marginBottom: 20,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#757575',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  editProfileBtn: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  editProfileText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // BOTTOM TAB BAR
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#E3F2FD',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  activeTabIcon: {
    transform: [{ scale: 1.15 }],
  },
  tabLabel: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#1E88E5',
    fontWeight: 'bold',
  },
});
