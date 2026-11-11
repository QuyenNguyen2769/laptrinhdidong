import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CategoryChips from './CategoryChips';
import BookCardGrid from './BookCardGrid';
import { SAMPLE_BOOKS } from '../data';

export default function Gio2_Screen() {
  const [columns, setColumns] = useState<2 | 3>(2);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>GIỜ 2: Kích thước, Wrap &amp; Lưới sản phẩm (Grid)</Text>
        <Text style={styles.headerSub}>
          Áp dụng: flexWrap: 'wrap', gap, aspectRatio: 3/4, width phần trăm
        </Text>
      </View>

      {/* Bài tập 1: Category Chips */}
      <CategoryChips />

      {/* Bài tập 2: Lưới sản phẩm (Book Grid) */}
      <View style={styles.gridSection}>
        <View style={styles.gridHeaderRow}>
          <Text style={styles.gridSectionTitle}>
            Bài 2: Lưới sản phẩm {columns} cột (Book Grid)
          </Text>
          {/* Nút đổi 2 cột / 3 cột cho Thử thách Giờ 2 */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, columns === 2 && styles.toggleBtnActive]}
              onPress={() => setColumns(2)}
            >
              <Text style={[styles.toggleText, columns === 2 && styles.toggleTextActive]}>2 Cột</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, columns === 3 && styles.toggleBtnActive]}
              onPress={() => setColumns(3)}
            >
              <Text style={[styles.toggleText, columns === 3 && styles.toggleTextActive]}>3 Cột</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Container lưới: flexDirection: 'row', flexWrap: 'wrap', gap hoặc space-between */}
        <View style={styles.gridContainer}>
          {SAMPLE_BOOKS.map((book) => (
            <BookCardGrid key={book.id} book={book} columns={columns} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 12,
  },
  headerBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  headerSub: {
    fontSize: 12,
    color: '#616161',
    marginTop: 2,
  },
  gridSection: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 6,
  },
  gridHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a237e',
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: '#f0f0f0',
    padding: 3,
    borderRadius: 6,
  },
  toggleBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  toggleBtnActive: {
    backgroundColor: '#1a237e',
  },
  toggleText: {
    fontSize: 11,
    color: '#616161',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  gridContainer: {
    // Yêu cầu kỹ thuật: flexDirection 'row', flexWrap 'wrap', justifyContent 'space-between'
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
