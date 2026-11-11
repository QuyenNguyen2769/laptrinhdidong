import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Screen01_Welcome from './components/bike/Screen01_Welcome';
import Screen02_BikeList from './components/bike/Screen02_BikeList';
import Screen03_BikeDetail from './components/bike/Screen03_BikeDetail';
import FlatListExercises from './components/flatlist/FlatListExercises';
import { Bike, SAMPLE_BIKES } from './data/bikes';

export default function App() {
  // Chế độ: 'bike' (Power Bike Shop) hoặc 'flatlist' (Bộ 5 bài FlatList)
  const [appMode, setAppMode] = useState<'bike' | 'flatlist'>('bike');

  // Điều hướng giữa các Screen của Bike Shop
  const [bikeScreen, setBikeScreen] = useState<'screen01' | 'screen02' | 'screen03'>('screen01');
  const [selectedBike, setSelectedBike] = useState<Bike>(SAMPLE_BIKES[0]);

  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    setBikeScreen('screen03');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Thanh Header chọn nhanh bài tập để bạn chụp minh chứng cực tiện lợi */}
      <View style={styles.topControlBar}>
        <View style={styles.modeRow}>
          <TouchableOpacity
            style={[styles.modeBtn, appMode === 'bike' && styles.modeBtnActive]}
            onPress={() => setAppMode('bike')}
          >
            <Text style={[styles.modeText, appMode === 'bike' && styles.modeTextActive]}>
              🚴 Bike Shop (Ảnh 1)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, appMode === 'flatlist' && styles.modeBtnActive]}
            onPress={() => setAppMode('flatlist')}
          >
            <Text style={[styles.modeText, appMode === 'flatlist' && styles.modeTextActive]}>
              📋 5 Bài FlatList (Ảnh 2)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Khi ở chế độ Bike Shop: Nút chọn nhanh Screen_01, Screen_02, Screen_03 */}
        {appMode === 'bike' && (
          <View style={styles.screenRow}>
            <TouchableOpacity
              style={[styles.screenBtn, bikeScreen === 'screen01' && styles.screenBtnActive]}
              onPress={() => setBikeScreen('screen01')}
            >
              <Text style={[styles.screenBtnText, bikeScreen === 'screen01' && styles.screenBtnTextActive]}>
                Screen_01 (Welcome)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.screenBtn, bikeScreen === 'screen02' && styles.screenBtnActive]}
              onPress={() => setBikeScreen('screen02')}
            >
              <Text style={[styles.screenBtnText, bikeScreen === 'screen02' && styles.screenBtnTextActive]}>
                Screen_02 (List)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.screenBtn, bikeScreen === 'screen03' && styles.screenBtnActive]}
              onPress={() => setBikeScreen('screen03')}
            >
              <Text style={[styles.screenBtnText, bikeScreen === 'screen03' && styles.screenBtnTextActive]}>
                Screen_03 (Detail)
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Vùng hiển thị màn hình */}
      <View style={styles.body}>
        {appMode === 'bike' ? (
          <>
            {bikeScreen === 'screen01' && (
              <Screen01_Welcome onGetStarted={() => setBikeScreen('screen02')} />
            )}
            {bikeScreen === 'screen02' && (
              <Screen02_BikeList
                onSelectBike={handleSelectBike}
                onBackToHome={() => setBikeScreen('screen01')}
              />
            )}
            {bikeScreen === 'screen03' && (
              <Screen03_BikeDetail
                bike={selectedBike}
                onBack={() => setBikeScreen('screen02')}
              />
            )}
          </>
        ) : (
          <FlatListExercises />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topControlBar: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 12,
    paddingTop: 36,
    paddingBottom: 8,
    gap: 6,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: '#1e293b',
    alignItems: 'center',
  },
  modeBtnActive: {
    backgroundColor: '#e11d48',
  },
  modeText: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '600',
  },
  modeTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  screenRow: {
    flexDirection: 'row',
    gap: 6,
  },
  screenBtn: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: '#334155',
    alignItems: 'center',
  },
  screenBtnActive: {
    backgroundColor: '#2563eb',
  },
  screenBtnText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '500',
  },
  screenBtnTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
  },
});
