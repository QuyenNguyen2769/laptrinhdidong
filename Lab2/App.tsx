import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Bai09_NewsFeed from './components/Bai09_NewsFeed';
import Bai10_UserProfile from './components/Bai10_UserProfile';
import Bai11_ProductSearch from './components/Bai11_ProductSearch';
import Bai12_ErrorHandling from './components/Bai12_ErrorHandling';
import Bai13_GenericFilter from './components/Bai13_GenericFilter';
import Bai14_Pagination from './components/Bai14_Pagination';
import Bai15_PullToRefresh from './components/Bai15_PullToRefresh';

export default function App() {
  const [selectedHour, setSelectedHour] = useState<number>(3); // Mặc định mở Giờ 3 để bạn kiểm tra & chụp

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>LAB 2: GỌI API & BẤT ĐỒNG BỘ</Text>
          <Text style={styles.headerSub}>Ứng dụng BookStore & Typescript Async</Text>
        </View>

        {/* Thanh chọn Giờ học */}
        <View style={styles.hourSelector}>
          <TouchableOpacity
            style={[styles.hourBtn, selectedHour === 1 && styles.hourBtnActive]}
            onPress={() => setSelectedHour(1)}
          >
            <Text style={[styles.hourBtnText, selectedHour === 1 && styles.hourBtnTextActive]}>
              Giờ 1 (Bài 9, 10)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.hourBtn, selectedHour === 2 && styles.hourBtnActive]}
            onPress={() => setSelectedHour(2)}
          >
            <Text style={[styles.hourBtnText, selectedHour === 2 && styles.hourBtnTextActive]}>
              Giờ 2 (Bài 11, 12, 13)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.hourBtn, selectedHour === 3 && styles.hourBtnActive]}
            onPress={() => setSelectedHour(3)}
          >
            <Text style={[styles.hourBtnText, selectedHour === 3 && styles.hourBtnTextActive]}>
              Giờ 3 (Bài 14, 15)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nội dung Giờ 1 */}
        {selectedHour === 1 && (
          <View>
            <Text style={styles.sectionHeader}>GIỜ 1: Fetch cơ bản & Null / Optional Chaining</Text>
            <Bai09_NewsFeed />
            <Bai10_UserProfile />
          </View>
        )}

        {/* Nội dung Giờ 2 */}
        {selectedHour === 2 && (
          <View>
            <Text style={styles.sectionHeader}>GIỜ 2: Tham số Async, Xử lý lỗi & Generic</Text>
            <Bai11_ProductSearch />
            <Bai12_ErrorHandling />
            <Bai13_GenericFilter />
          </View>
        )}

        {/* Nội dung Giờ 3 */}
        {selectedHour === 3 && (
          <View>
            <Text style={styles.sectionHeader}>GIỜ 3: Generic Interface & Đồng bộ Async State</Text>
            <Bai14_Pagination />
            <Bai15_PullToRefresh />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  container: {
    padding: 16,
    paddingTop: 40,
    gap: 12,
  },
  header: {
    marginBottom: 6,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d6efd',
    textAlign: 'center',
  },
  headerSub: {
    fontSize: 13,
    color: '#6c757d',
    marginTop: 2,
    textAlign: 'center',
  },
  hourSelector: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#e9ecef',
    padding: 4,
    borderRadius: 8,
  },
  hourBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  hourBtnActive: {
    backgroundColor: '#0d6efd',
  },
  hourBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  hourBtnTextActive: {
    color: '#fff',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
    marginVertical: 6,
    textTransform: 'uppercase',
  },
});
