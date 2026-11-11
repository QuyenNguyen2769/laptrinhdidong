import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Bai01_SelectPhone from './components/Bai01_SelectPhone';
import Bai02_API_Integration from './components/Bai02_API_Integration';
import Bai03_BottomTabNavigation from './components/Bai03_BottomTabNavigation';
import Bai04_StackTabParams from './components/Bai04_StackTabParams';
import Bai05_DrawerNavigation from './components/Bai05_DrawerNavigation';

type ExerciseKey = 'BAI_1' | 'BAI_2' | 'BAI_3' | 'BAI_4' | 'BAI_5';

interface ExerciseTab {
  key: ExerciseKey;
  title: string;
  shortName: string;
  icon: string;
}

const EXERCISE_TABS: ExerciseTab[] = [
  { key: 'BAI_1', title: 'Bài 1: Select Phone', shortName: 'Bài 1: Chọn Màu', icon: '📱' },
  { key: 'BAI_2', title: 'Bài 2: Gắn MockAPI', shortName: 'Bài 2: MockAPI', icon: '🌐' },
  { key: 'BAI_3', title: 'Bài 3: Bottom Tab', shortName: 'Bài 3: Bottom Tab', icon: '📑' },
  { key: 'BAI_4', title: 'Bài 4: Stack + Tab + Params', shortName: 'Bài 4: Stack + Tab', icon: '🔄' },
  { key: 'BAI_5', title: 'Bài 5: Drawer Navigation', shortName: 'Bài 5: Drawer Menu', icon: '☰' },
];

export default function App() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseKey>('BAI_4');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />

      {/* Header Sinh Viên & Môn Học */}
      <View style={styles.studentHeader}>
        <Text style={styles.appTitle}>BÀI TẬP TUẦN 5: NAVIGATION & EXPO ROUTER</Text>
        <Text style={styles.studentInfo}>
          Sinh viên: <Text style={styles.studentName}>Nguyễn Như Ngọc Quyên</Text> | MSSV: <Text style={styles.studentName}>23663981</Text>
        </Text>
      </View>

      {/* Thanh Menu điều hướng 5 bài tập - 2 HÀNG RÕ RÀNG, KHÔNG BAO GIỜ BỊ TRÀN */}
      <View style={styles.tabsGridContainer}>
        <View style={styles.tabsRow}>
          {EXERCISE_TABS.slice(0, 3).map((tab) => {
            const isActive = tab.key === selectedExercise;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setSelectedExercise(tab.key)}
                activeOpacity={0.7}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]} numberOfLines={1}>
                  {tab.shortName}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.tabsRow}>
          {EXERCISE_TABS.slice(3, 5).map((tab) => {
            const isActive = tab.key === selectedExercise;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabButton, styles.tabButtonWide, isActive && styles.tabButtonActive]}
                onPress={() => setSelectedExercise(tab.key)}
                activeOpacity={0.7}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]} numberOfLines={1}>
                  {tab.shortName}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Nội dung bài tập tương ứng */}
      <View style={styles.contentContainer}>
        {selectedExercise === 'BAI_1' && <Bai01_SelectPhone />}
        {selectedExercise === 'BAI_2' && <Bai02_API_Integration />}
        {selectedExercise === 'BAI_3' && <Bai03_BottomTabNavigation />}
        {selectedExercise === 'BAI_4' && <Bai04_StackTabParams />}
        {selectedExercise === 'BAI_5' && <Bai05_DrawerNavigation />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A237E',
  },
  studentHeader: {
    backgroundColor: '#1A237E',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#283593',
    alignItems: 'center',
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  studentInfo: {
    color: '#C5CAE9',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },
  studentName: {
    color: '#FFD54F',
    fontWeight: 'bold',
  },
  tabsGridContainer: {
    backgroundColor: '#283593',
    padding: 6,
    gap: 6,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    position: 'relative',
  },
  tabButtonWide: {
    flex: 1,
  },
  tabButtonActive: {
    backgroundColor: '#3F51B5',
    borderWidth: 1,
    borderColor: '#FFD54F',
  },
  tabIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  tabButtonText: {
    color: '#E8EAF6',
    fontSize: 11,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 1,
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: '#FFD54F',
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
});
