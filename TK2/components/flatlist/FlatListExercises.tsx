import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

// Dữ liệu mẫu Bài 1 (4_a - Chat)
const CHAT_DATA = [
  { id: '1', title: 'Ca nấu lẩu, nấu mì mini...', shop: 'Devang', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80' },
  { id: '2', title: '1KG KHÔ GÀ BƠ TỎI', shop: 'LTD Food', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=100&q=80' },
  { id: '3', title: 'Xe cần cẩu đa năng', shop: 'Thế giới đồ chơi', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=100&q=80' },
  { id: '4', title: 'Đồ chơi dạng mô hình', shop: 'Thế giới đồ chơi', image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=100&q=80' },
  { id: '5', title: 'Lãnh đạo giản đơn', shop: 'Minh Long Book', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&q=80' },
  { id: '6', title: 'Hiểu lòng con trẻ', shop: 'Minh Long Book', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&q=80' },
];

// Dữ liệu mẫu Bài 2 (4_b - Lưới phụ kiện)
const PRODUCT_DATA = [
  { id: '1', title: 'Cáp chuyển từ Cổng USB sang PS2...', rating: 4, reviews: 15, price: '69.000 đ', discount: '-39%', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&q=80' },
  { id: '2', title: 'Cáp chuyển từ Cổng USB sang PS2...', rating: 4, reviews: 15, price: '69.900 đ', discount: '-39%', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=150&q=80' },
  { id: '3', title: 'Cáp chuyển từ Cổng USB sang PS2...', rating: 4, reviews: 15, price: '69.900 đ', discount: '-39%', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&q=80' },
  { id: '4', title: 'Cáp chuyển từ Cổng USB sang PS2...', rating: 4, reviews: 15, price: '69.900 đ', discount: '-39%', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=150&q=80' },
];

// Dữ liệu mẫu người dùng Bài 3 & 4
const USER_DATA = [
  { id: '1', name: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com' },
  { id: '2', name: 'Trần Thị Bình', email: 'binh.tran@gmail.com' },
  { id: '3', name: 'Lê Hoàng Cường', email: 'cuong.le@gmail.com' },
  { id: '4', name: 'Phạm Thu Dung', email: 'dung.pham@gmail.com' },
  { id: '5', name: 'Hoàng Minh Đức', email: 'duc.hoang@gmail.com' },
];

// Dữ liệu mẫu Gallery Bài 5
const GALLERY_DATA = [
  { id: '1', title: 'Bình minh Đà Lạt', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80' },
  { id: '2', title: 'Hoàng hôn Phú Quốc', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80' },
  { id: '3', title: 'Núi rừng Tây Bắc', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80' },
  { id: '4', title: 'Phố cổ Hội An', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=80' },
];

export default function FlatListExercises() {
  // Mặc định cho phép mở 'all' hoặc từng bài
  const [activeTab, setActiveTab] = useState<'all' | 'bai1' | 'bai2' | 'bai3' | 'bai4' | 'bai5'>('bai5');
  const [loading, setLoading] = useState<boolean>(false);
  const [galleryViewMode, setGalleryViewMode] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    if (activeTab === 'bai3' || activeTab === 'bai4' || activeTab === 'bai5') {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh chọn bài dạng Wrap (hiển thị đủ cả 5 bài và nút Xem tất cả, KHÔNG bị khuất) */}
      <View style={styles.topControlContainer}>
        <Text style={styles.controlHeading}>CHỌN BÀI ĐỂ CHỤP ẢNH MINH CHỨNG:</Text>
        <View style={styles.wrapButtonsRow}>
          {[
            { id: 'all', label: '📜 Xem Tất Cả (Cuộn)' },
            { id: 'bai1', label: 'Bài 1: 4_a Chat' },
            { id: 'bai2', label: 'Bài 2: 4_b Lưới' },
            { id: 'bai3', label: 'Bài 3: Users API' },
            { id: 'bai4', label: 'Bài 4: Horizontal' },
            { id: 'bai5', label: '⭐ Bài 5: Gallery App' },
          ].map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[styles.btnTab, activeTab === t.id && styles.btnTabActive]}
              onPress={() => setActiveTab(t.id as any)}
            >
              <Text style={[styles.btnTabText, activeTab === t.id && styles.btnTabTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Vùng hiển thị nội dung */}
      <ScrollView style={styles.bodyScroll} contentContainerStyle={styles.bodyContent}>
        {/* Nút điều hướng nhanh ở đầu nếu đang ở Bài 4 */}
        {activeTab === 'bai4' && (
          <TouchableOpacity
            style={styles.nextBigBtn}
            onPress={() => setActiveTab('bai5')}
          >
            <Text style={styles.nextBigBtnText}>👉 Bấm vào đây để chuyển sang Bài 5: Gallery App ▶</Text>
          </TouchableOpacity>
        )}

        {/* ==================== BÀI 1: FlatList 4_a ==================== */}
        {(activeTab === 'bai1' || activeTab === 'all') && (
          <View style={styles.exerciseSection}>
            <View style={styles.badgeSection}>
              <Text style={styles.badgeSectionText}>Bài 1: Dùng Flatlist 4_a (Chat List)</Text>
            </View>
            <View style={styles.chatHeader}>
              <Text style={styles.chatHeaderTitle}>Chat</Text>
              <Text style={{ fontSize: 18, color: '#fff' }}>🛒</Text>
            </View>
            <View style={styles.chatNotice}>
              <Text style={styles.chatNoticeText}>
                Bạn có thắc mắc với sản phẩm vừa xem. Đừng ngại chat với shop!
              </Text>
            </View>
            <View>
              {CHAT_DATA.map((item) => (
                <View key={item.id} style={styles.chatItem}>
                  <Image source={{ uri: item.image }} style={styles.chatThumb} />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.shopName}>Shop: <Text style={{ color: '#d32f2f' }}>{item.shop}</Text></Text>
                  </View>
                  <TouchableOpacity style={styles.btnChat}>
                    <Text style={styles.btnChatText}>Chat</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ==================== BÀI 2: FlatList 4_b ==================== */}
        {(activeTab === 'bai2' || activeTab === 'all') && (
          <View style={styles.exerciseSection}>
            <View style={styles.badgeSection}>
              <Text style={styles.badgeSectionText}>Bài 2: Dùng Flatlist 4_b (Lưới sản phẩm)</Text>
            </View>
            <View style={styles.searchHeader}>
              <Text style={{ fontSize: 16, color: '#fff' }}>🔍 Dây cáp usb</Text>
              <Text style={{ fontSize: 18, color: '#fff' }}>🛒</Text>
            </View>
            <View style={styles.gridContainerRow}>
              {PRODUCT_DATA.map((item) => (
                <View key={item.id} style={styles.gridCard}>
                  <Image source={{ uri: item.image }} style={styles.gridThumb} />
                  <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.ratingStars}>⭐⭐⭐⭐ ({item.reviews})</Text>
                  <View style={{ flexDirection: 'row', gap: 6, alignItems: 'baseline' }}>
                    <Text style={styles.gridPrice}>{item.price}</Text>
                    <Text style={styles.gridDiscount}>{item.discount}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ==================== BÀI 3: Users API ==================== */}
        {(activeTab === 'bai3' || activeTab === 'all') && (
          <View style={styles.exerciseSection}>
            <View style={styles.badgeSection}>
              <Text style={styles.badgeSectionText}>Bài tập 3: Hiển thị danh sách người dùng từ API</Text>
            </View>
            {loading ? (
              <ActivityIndicator size="small" color="#007AFF" style={{ marginVertical: 20 }} />
            ) : (
              <View style={{ gap: 8 }}>
                {USER_DATA.map((item) => (
                  <View key={item.id} style={styles.userCard}>
                    <Text style={styles.userName}>👤 {item.name}</Text>
                    <Text style={styles.userEmail}>📧 {item.email}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* ==================== BÀI 4: Horizontal User ==================== */}
        {(activeTab === 'bai4' || activeTab === 'all') && (
          <View style={styles.exerciseSection}>
            <View style={styles.badgeSection}>
              <Text style={styles.badgeSectionText}>Bài tập 4: Danh sách User dạng HorizontalList (cuộn ngang)</Text>
            </View>
            {loading ? (
              <ActivityIndicator size="small" color="#007AFF" style={{ marginVertical: 20 }} />
            ) : (
              <FlatList
                data={USER_DATA}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingVertical: 10 }}
                renderItem={({ item }) => (
                  <View style={styles.horizontalUserCard}>
                    <View style={styles.avatarCircle}>
                      <Text style={{ fontSize: 28 }}>👨‍💼</Text>
                    </View>
                    <Text style={styles.userNameBold}>{item.name}</Text>
                    <Text style={styles.userEmailSmall}>{item.email}</Text>
                  </View>
                )}
              />
            )}

            {activeTab === 'bai4' && (
              <TouchableOpacity
                style={[styles.nextBigBtn, { marginTop: 16 }]}
                onPress={() => setActiveTab('bai5')}
              >
                <Text style={styles.nextBigBtnText}>👉 Chuyển sang chụp Bài 5: Gallery App ▶</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* ==================== BÀI 5: Gallery App ==================== */}
        {(activeTab === 'bai5' || activeTab === 'all') && (
          <View style={styles.exerciseSection}>
            <View style={[styles.badgeSection, { backgroundColor: '#2563eb' }]}>
              <Text style={[styles.badgeSectionText, { color: '#ffffff' }]}>
                ⭐ Bài tập 5: "Gallery App"
              </Text>
            </View>

            {/* Nút chuyển đổi ListView 1 cột và GridView 2 cột */}
            <View style={styles.galleryToggleRow}>
              <Text style={{ fontWeight: 'bold', color: '#1e293b' }}>Chế độ hiển thị:</Text>
              <TouchableOpacity
                style={styles.toggleBtn}
                onPress={() => setGalleryViewMode(galleryViewMode === 'grid' ? 'list' : 'grid')}
              >
                <Text style={styles.toggleBtnText}>
                  {galleryViewMode === 'grid' ? '🔄 Bấm đổi sang: ListView (1 Cột)' : '🔄 Bấm đổi sang: GridView (2 Cột)'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Mục Horizontal nổi bật theo đúng yêu cầu đề bài */}
            <Text style={styles.subHeading}>1. Horizontal List: Ảnh nổi bật (Scroll ngang):</Text>
            <FlatList
              data={GALLERY_DATA}
              keyExtractor={(item) => `gallery-h-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, paddingVertical: 6 }}
              renderItem={({ item }) => (
                <View style={styles.horizGalleryCard}>
                  <Image source={{ uri: item.image }} style={styles.horizGalleryThumb} />
                  <Text style={styles.galleryTitle}>{item.title}</Text>
                </View>
              )}
            />

            {/* Danh sách ảnh theo ListView / GridView */}
            <Text style={[styles.subHeading, { marginTop: 16 }]}>
              2. Bộ sưu tập ảnh ({galleryViewMode === 'grid' ? 'GridView: 2 Cột' : 'ListView: 1 Cột'}):
            </Text>

            {loading ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <View style={galleryViewMode === 'grid' ? styles.gridWrap : { gap: 10 }}>
                {GALLERY_DATA.map((item) => (
                  <View
                    key={item.id}
                    style={galleryViewMode === 'grid' ? styles.galleryGridCard : styles.galleryListCard}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={galleryViewMode === 'grid' ? styles.galleryGridThumb : styles.galleryListThumb}
                    />
                    <Text style={styles.galleryTitle}>{item.title}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  topControlContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  controlHeading: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 6,
  },
  wrapButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  btnTab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  btnTabActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  btnTabText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  btnTabTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  nextBigBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 14,
    elevation: 3,
  },
  nextBigBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bodyScroll: {
    flex: 1,
  },
  bodyContent: {
    padding: 12,
    gap: 16,
    paddingBottom: 40,
  },
  exerciseSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    paddingBottom: 12,
  },
  badgeSection: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  badgeSectionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  chatHeader: {
    backgroundColor: '#1ba9ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chatHeaderTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  chatNotice: {
    backgroundColor: '#e5f6fd',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#c5eaf8',
  },
  chatNoticeText: {
    fontSize: 12,
    color: '#0288d1',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    gap: 12,
  },
  chatThumb: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  shopName: {
    fontSize: 12,
    color: '#777',
  },
  btnChat: {
    backgroundColor: '#e53935',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 4,
  },
  btnChatText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchHeader: {
    backgroundColor: '#1ba9ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  gridContainerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
  },
  gridCard: {
    width: '48.5%',
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10,
  },
  gridThumb: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    marginBottom: 6,
  },
  gridTitle: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  ratingStars: {
    fontSize: 11,
    color: '#f59e0b',
    marginVertical: 4,
  },
  gridPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  gridDiscount: {
    fontSize: 11,
    color: '#9e9e9e',
  },
  userCard: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginHorizontal: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  userEmail: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  horizontalUserCard: {
    width: 140,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    gap: 6,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameBold: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userEmailSmall: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
  },
  galleryToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
    margin: 12,
  },
  toggleBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  toggleBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    marginHorizontal: 12,
    marginBottom: 6,
  },
  horizGalleryCard: {
    width: 150,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  horizGalleryThumb: {
    width: '100%',
    height: 90,
  },
  galleryTitle: {
    fontSize: 12,
    fontWeight: '600',
    padding: 6,
    textAlign: 'center',
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  galleryGridCard: {
    width: '48.5%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10,
  },
  galleryGridThumb: {
    width: '100%',
    height: 110,
  },
  galleryListCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginHorizontal: 12,
    marginBottom: 10,
  },
  galleryListThumb: {
    width: '100%',
    height: 160,
  },
});
