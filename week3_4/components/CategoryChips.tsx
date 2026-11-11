import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SAMPLE_CATEGORIES, Category } from '../data';

export default function CategoryChips() {
  const [selectedId, setSelectedId] = useState<string>('1');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 1: Danh sách danh mục dạng chip (Category Chips)</Text>
      <Text style={styles.subText}>flexDirection: 'row', flexWrap: 'wrap', gap: 8, shape: pill</Text>

      {/* Container bọc các chip tự động xuống dòng khi tràn màn hình */}
      <View style={styles.chipsWrapContainer}>
        {SAMPLE_CATEGORIES.map((cat: Category) => {
          const isSelected = cat.id === selectedId;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => setSelectedId(cat.id)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  subText: {
    fontSize: 12,
    color: '#616161',
    marginBottom: 10,
  },
  chipsWrapContainer: {
    // Yêu cầu kỹ thuật: flexDirection 'row', flexWrap 'wrap', gap 8
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignContent: 'flex-start', // Xếp các dòng sát nhau từ trên xuống
  },
  chip: {
    // Yêu cầu: width 'auto' theo nội dung, padding, borderRadius dạng pill, border 1px indigo
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20, // Bo tròn dạng pill
    borderWidth: 1,
    borderColor: '#1a237e', // Viền màu indigo
    backgroundColor: '#ffffff',
  },
  chipSelected: {
    backgroundColor: '#1a237e', // Nền màu indigo khi được chọn
  },
  chipText: {
    fontSize: 13,
    color: '#1a237e',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
