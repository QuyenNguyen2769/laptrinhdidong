import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { Bike, SAMPLE_BIKES } from '../../data/bikes';

interface Screen02Props {
  onSelectBike: (bike: Bike) => void;
  onBackToHome?: () => void;
}

export default function Screen02_BikeList({ onSelectBike, onBackToHome }: Screen02Props) {
  const [filter, setFilter] = useState<'All' | 'Roadbike' | 'Mountain'>('All');
  const [bikes, setBikes] = useState<Bike[]>(SAMPLE_BIKES);

  const filteredBikes = bikes.filter((b) => {
    if (filter === 'All') return true;
    return b.category === filter;
  });

  const toggleFavorite = (id: string) => {
    setBikes((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {onBackToHome && (
          <TouchableOpacity onPress={onBackToHome} style={styles.backBtn}>
            <Text style={styles.backText}>◀ Screen 01</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.mainTitle}>The world's Best Bike</Text>
      </View>

      {/* 3 Tabs Lọc: All, Roadbike, Mountain */}
      <View style={styles.tabRow}>
        {(['All', 'Roadbike', 'Mountain'] as const).map((tab) => {
          const isActive = filter === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
              onPress={() => setFilter(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Lưới 2 cột xe đạp */}
      <FlatList
        data={filteredBikes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bikeCard}
            onPress={() => onSelectBike(item)}
            activeOpacity={0.85}
          >
            {/* Nút tim yêu thích góc trên-trái */}
            <TouchableOpacity
              style={styles.heartBtn}
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={styles.heartIcon}>{item.isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>

            {/* Ảnh xe đạp */}
            <Image source={{ uri: item.image }} style={styles.bikeThumb} resizeMode="contain" />

            {/* Tên xe */}
            <Text style={styles.bikeName} numberOfLines={1}>{item.name}</Text>

            {/* Giá tiền: dấu $ cam, số đen */}
            <View style={styles.priceRow}>
              <Text style={styles.currency}>$ </Text>
              <Text style={styles.priceValue}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    marginBottom: 6,
  },
  backText: {
    fontSize: 12,
    color: '#888888',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94141',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 12,
    gap: 12,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  tabBtnActive: {
    borderColor: '#e94141',
  },
  tabText: {
    fontSize: 13,
    color: '#999999',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#e94141',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  bikeCard: {
    width: '47.5%',
    backgroundColor: '#fef5ec',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
  },
  heartIcon: {
    fontSize: 16,
  },
  bikeThumb: {
    width: '100%',
    height: 100,
    marginTop: 12,
    marginBottom: 6,
  },
  bikeName: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '600',
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  currency: {
    color: '#f09b38',
    fontSize: 13,
    fontWeight: 'bold',
  },
  priceValue: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
