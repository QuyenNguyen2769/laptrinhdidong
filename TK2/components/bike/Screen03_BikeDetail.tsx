import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Bike } from '../../data/bikes';

interface Screen03Props {
  bike: Bike;
  onBack: () => void;
}

export default function Screen03_BikeDetail({ bike, onBack }: Screen03Props) {
  const [isFavorite, setIsFavorite] = useState(bike.isFavorite || false);

  const handleAddToCart = () => {
    Alert.alert('🛒 Giỏ Hàng', `Đã thêm "${bike.name}" vào giỏ hàng thành công!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút quay lại */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ Screen 02</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Nửa trên: Khung hồng nhạt chứa ảnh xe lớn */}
        <View style={styles.imageCard}>
          <Image source={{ uri: bike.image }} style={styles.largeImage} resizeMode="contain" />
        </View>

        {/* Thông tin xe */}
        <View style={styles.infoSection}>
          <Text style={styles.bikeTitle}>{bike.name}</Text>

          {/* Dòng giá & giảm giá: 15% OFF | 350$    449$ */}
          <View style={styles.priceRow}>
            <Text style={styles.discountText}>
              {bike.discount || '15% OFF'} I {bike.originalPrice ? `${bike.originalPrice}$` : '350$'}
            </Text>
            <Text style={styles.currentPrice}>{bike.price}$</Text>
          </View>

          {/* Mô tả */}
          <Text style={styles.descHeading}>Description</Text>
          <Text style={styles.descBody}>{bike.description}</Text>
        </View>
      </ScrollView>

      {/* Đáy cùng: Icon tim + Nút 'Add to card' */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Text style={styles.heartIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAddToCart} onPress={handleAddToCart} activeOpacity={0.85}>
          <Text style={styles.btnAddToCartText}>Add to card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topNav: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    paddingVertical: 4,
  },
  backText: {
    fontSize: 13,
    color: '#e94141',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imageCard: {
    width: '100%',
    height: 300,
    backgroundColor: '#faecea',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 20,
  },
  largeImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    gap: 10,
  },
  bikeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 30,
    marginTop: 4,
  },
  discountText: {
    fontSize: 15,
    color: '#777777',
    fontWeight: '500',
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  descHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 12,
  },
  descBody: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 16,
    backgroundColor: '#ffffff',
  },
  heartBtn: {
    padding: 10,
  },
  heartIcon: {
    fontSize: 26,
  },
  btnAddToCart: {
    flex: 1,
    backgroundColor: '#e94141',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  btnAddToCartText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
