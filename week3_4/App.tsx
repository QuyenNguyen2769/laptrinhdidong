import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Gio1_Screen from './components/Gio1_Screen';
import Gio2_Screen from './components/Gio2_Screen';
import Gio3_Screen from './components/Gio3_Screen';
import Gio4_Screen from './components/Gio4_Screen';
import Gio5_Screen from './components/Gio5_Screen';

export default function App() {
  const [selectedHour, setSelectedHour] = useState<number>(5); // Mặc định mở Giờ 5

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh chọn nhanh Giờ học phục vụ chụp minh chứng */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>TUẦN 3-4: FLEXBOX LAYOUT (BOOKSTORE)</Text>
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, selectedHour === 1 && styles.tabBtnActive]}
            onPress={() => setSelectedHour(1)}
          >
            <Text style={[styles.tabText, selectedHour === 1 && styles.tabTextActive]}>
              Giờ 1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, selectedHour === 2 && styles.tabBtnActive]}
            onPress={() => setSelectedHour(2)}
          >
            <Text style={[styles.tabText, selectedHour === 2 && styles.tabTextActive]}>
              Giờ 2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, selectedHour === 3 && styles.tabBtnActive]}
            onPress={() => setSelectedHour(3)}
          >
            <Text style={[styles.tabText, selectedHour === 3 && styles.tabTextActive]}>
              Giờ 3
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, selectedHour === 4 && styles.tabBtnActive]}
            onPress={() => setSelectedHour(4)}
          >
            <Text style={[styles.tabText, selectedHour === 4 && styles.tabTextActive]}>
              Giờ 4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, selectedHour === 5 && styles.tabBtnActive]}
            onPress={() => setSelectedHour(5)}
          >
            <Text style={[styles.tabText, selectedHour === 5 && styles.tabTextActive]}>
              Giờ 5: Tab &amp; Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hiển thị màn hình theo giờ học */}
      <View style={styles.body}>
        {selectedHour === 1 && <Gio1_Screen />}
        {selectedHour === 2 && <Gio2_Screen />}
        {selectedHour === 3 && <Gio3_Screen />}
        {selectedHour === 4 && <Gio4_Screen />}
        {selectedHour === 5 && <Gio5_Screen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    paddingTop: 36,
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: '#0d1b2a',
  },
  topTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e0e1dd',
    textAlign: 'center',
    marginBottom: 6,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#1b263b',
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#3a86ff',
  },
  tabText: {
    fontSize: 11,
    color: '#e0e1dd',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
  },
});
