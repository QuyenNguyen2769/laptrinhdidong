import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScreen from './HomeScreen';
import BookDetailScreen from './BookDetailScreen';
import { Book, SAMPLE_BOOKS } from '../data';

export default function Gio4_Screen() {
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
  const [selectedBook, setSelectedBook] = useState<Book>(SAMPLE_BOOKS[0]);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentView('detail');
  };

  return (
    <View style={styles.container}>
      {/* Thanh công cụ chuyển nhanh giữa 2 bài tập của Giờ 4 */}
      <View style={styles.subToolbar}>
        <TouchableOpacity
          style={[styles.toolBtn, currentView === 'home' && styles.toolBtnActive]}
          onPress={() => setCurrentView('home')}
        >
          <Text style={[styles.toolText, currentView === 'home' && styles.toolTextActive]}>
            Bài 1: Trang chủ hoàn chỉnh (Home)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolBtn, currentView === 'detail' && styles.toolBtnActive]}
          onPress={() => setCurrentView('detail')}
        >
          <Text style={[styles.toolText, currentView === 'detail' && styles.toolTextActive]}>
            Bài 2: Chi tiết sách (Detail)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render màn hình tương ứng */}
      <View style={{ flex: 1 }}>
        {currentView === 'home' ? (
          <HomeScreen onSelectBook={handleSelectBook} />
        ) : (
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setCurrentView('home')}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  subToolbar: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    backgroundColor: '#e8eaf6',
    borderBottomWidth: 1,
    borderBottomColor: '#c5cae9',
  },
  toolBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c5cae9',
  },
  toolBtnActive: {
    backgroundColor: '#1a237e',
    borderColor: '#1a237e',
  },
  toolText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a237e',
  },
  toolTextActive: {
    color: '#ffffff',
  },
});
