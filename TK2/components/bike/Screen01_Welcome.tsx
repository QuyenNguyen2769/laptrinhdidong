import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

interface Screen01Props {
  onGetStarted: () => void;
}

export default function Screen01_Welcome({ onGetStarted }: Screen01Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Slogan phía trên */}
        <Text style={styles.subtitle}>
          A premium online store for{'\n'}sporter and their stylish choice
        </Text>

        {/* Khung hồng nhạt chứa ảnh xe đạp */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80' }}
            style={styles.bikeImage}
            resizeMode="contain"
          />
        </View>

        {/* Tên cửa hàng */}
        <Text style={styles.brandTitle}>POWER BIKE{'\n'}SHOP</Text>

        {/* Nút Get Started màu đỏ bo tròn */}
        <TouchableOpacity style={styles.btnGetStarted} onPress={onGetStarted} activeOpacity={0.85}>
          <Text style={styles.btnText}>Get Started</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'monospace',
  },
  imageCard: {
    width: '100%',
    height: 320,
    backgroundColor: '#faecea',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bikeImage: {
    width: '100%',
    height: '100%',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 30,
  },
  btnGetStarted: {
    width: '100%',
    backgroundColor: '#e94141',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
