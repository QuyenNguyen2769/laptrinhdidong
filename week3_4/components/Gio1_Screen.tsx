import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Header from './Header';
import BookCardRow from './BookCardRow';
import { SAMPLE_BOOKS } from '../data';

export default function Gio1_Screen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* 1. Header cố định trên cùng màn hình (Bài 1) */}
      <Header />

      {/* 2. Vùng nội dung cuộn chiếm hết không gian còn lại bằng flex: 1 (Thử thách Giờ 1) */}
      <View style={styles.contentContainer}>
        <View style={styles.sectionTitleBox}>
          <Text style={styles.sectionTitle}>GIỜ 1: Nền tảng Flexbox & Layout cơ bản</Text>
          <Text style={styles.sectionSubtitle}>
            • Bài 1: Header (flexDirection: 'row', space-between, alignItems: 'center')
          </Text>
          <Text style={styles.sectionSubtitle}>
            • Bài 2: Thẻ sách đơn (ảnh cố định 80x110, thông tin flex: 1, giá căn đáy)
          </Text>
          <Text style={styles.sectionSubtitle}>
            • Thử thách: Header cố định + Danh sách ScrollView (flex: 1)
          </Text>
        </View>

        <ScrollView
          style={styles.scrollList}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {SAMPLE_BOOKS.map((book) => (
            <BookCardRow key={book.id} book={book} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1a237e', // Đồng bộ màu status bar với header
  },
  contentContainer: {
    // flex: 1 để chiếm trọn phần không gian còn lại sau Header
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionTitleBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#616161',
    marginTop: 2,
  },
  scrollList: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
  },
});
