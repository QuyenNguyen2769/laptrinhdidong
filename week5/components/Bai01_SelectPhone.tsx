import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

// Dữ liệu 4 phiên bản màu điện thoại Vsmart Joy 3
export interface PhoneColorOption {
  id: string;
  colorName: string;
  colorHex: string;
  provider: string;
  price: string;
  originalPrice: string;
  image: any;
}

export const PHONE_COLORS: PhoneColorOption[] = [
  {
    id: 'silver',
    colorName: 'Bạc (Xanh nhạt)',
    colorHex: '#C5F1FB',
    provider: 'Tiki Tradding',
    price: '1.790.000 đ',
    originalPrice: '1.790.000 đ',
    image: require('../assets/phones/vs_silver.png'),
  },
  {
    id: 'red',
    colorName: 'Đỏ Ruby',
    colorHex: '#F30D0D',
    provider: 'Tiki Tradding',
    price: '1.790.000 đ',
    originalPrice: '1.790.000 đ',
    image: require('../assets/phones/vs_red.png'),
  },
  {
    id: 'black',
    colorName: 'Đen Huyền Bí',
    colorHex: '#000000',
    provider: 'Tiki Tradding',
    price: '1.790.000 đ',
    originalPrice: '1.790.000 đ',
    image: require('../assets/phones/vs_black.png'),
  },
  {
    id: 'blue',
    colorName: 'Xanh Dương',
    colorHex: '#234896',
    provider: 'Tiki Tradding',
    price: '1.790.000 đ',
    originalPrice: '1.790.000 đ',
    image: require('../assets/phones/vs_blue.png'),
  },
];

export default function Bai01_SelectPhone() {
  // Màn hình hiện tại: 'DETAIL' (Màn hình 1) hoặc 'SELECT_COLOR' (Màn hình 2)
  const [currentScreen, setCurrentScreen] = useState<'DETAIL' | 'SELECT_COLOR'>('DETAIL');

  // Màu đang chọn chính thức hiển thị ở Màn hình 1 (mặc định là Xanh Dương)
  const [selectedPhone, setSelectedPhone] = useState<PhoneColorOption>(PHONE_COLORS[3]);

  // Màu tạm thời đang chọn ở Màn hình 2 trước khi bấm XONG
  const [tempColor, setTempColor] = useState<PhoneColorOption>(PHONE_COLORS[3]);

  // Chuyển sang màn hình chọn màu
  const handleOpenColorPicker = () => {
    setTempColor(selectedPhone);
    setCurrentScreen('SELECT_COLOR');
  };

  // Xác nhận chọn màu và quay về Màn hình 1
  const handleConfirmColor = () => {
    setSelectedPhone(tempColor);
    setCurrentScreen('DETAIL');
  };

  // Hủy và quay lại Màn hình 1 giữ nguyên màu cũ
  const handleCancel = () => {
    setCurrentScreen('DETAIL');
  };

  const handleBuyNow = () => {
    Alert.alert(
      'Đặt hàng thành công!',
      `Bạn đã chọn mua: Vsmart Joy 3 - Màu ${selectedPhone.colorName}\nGiá: ${selectedPhone.price}`
    );
  };

  // ================= MÀN HÌNH 2: CHỌN MÀU =================
  if (currentScreen === 'SELECT_COLOR') {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header thông tin sản phẩm thu nhỏ */}
        <View style={styles.colorHeader}>
          <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Quay lại</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Image source={tempColor.image} style={styles.headerImage} resizeMode="contain" />
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Điện Thoại Vsmart Joy 3</Text>
              <Text style={styles.headerSub}>Hàng chính hãng</Text>
              <Text style={styles.headerColorRow}>
                Màu: <Text style={styles.boldText}>{tempColor.colorName}</Text>
              </Text>
              <Text style={styles.headerProviderRow}>
                Cung cấp bởi: <Text style={styles.boldText}>{tempColor.provider}</Text>
              </Text>
              <Text style={styles.headerPrice}>{tempColor.price}</Text>
            </View>
          </View>
        </View>

        {/* Khung chọn màu */}
        <View style={styles.colorBody}>
          <Text style={styles.colorBodyTitle}>Chọn một màu bên dưới:</Text>

          <View style={styles.colorPalette}>
            {PHONE_COLORS.map((item) => {
              const isSelected = item.id === tempColor.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.colorBox,
                    { backgroundColor: item.colorHex },
                    isSelected && styles.selectedColorBox,
                  ]}
                  onPress={() => setTempColor(item)}
                  activeOpacity={0.8}
                >
                  {isSelected && (
                    <View style={styles.checkmarkBadge}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Nút XONG */}
          <TouchableOpacity style={styles.doneButton} onPress={handleConfirmColor} activeOpacity={0.85}>
            <Text style={styles.doneButtonText}>XONG</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ================= MÀN HÌNH 1: CHI TIẾT SẢN PHẨM =================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.detailScrollContent}>
        {/* Ảnh điện thoại lớn theo màu đã chọn */}
        <View style={styles.imageContainer}>
          <Image source={selectedPhone.image} style={styles.phoneImage} resizeMode="contain" />
        </View>

        {/* Tên sản phẩm */}
        <Text style={styles.productTitle}>Điện Thoại Vsmart Joy 3 - Hàng chính hãng</Text>

        {/* Đánh giá sao */}
        <View style={styles.ratingRow}>
          <View style={styles.starsContainer}>
            <Text style={styles.starText}>★★★★★</Text>
          </View>
          <Text style={styles.reviewsText}>(Xem 828 đánh giá)</Text>
        </View>

        {/* Giá tiền */}
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>{selectedPhone.price}</Text>
          <Text style={styles.originalPrice}>{selectedPhone.originalPrice}</Text>
        </View>

        {/* Cam kết hoàn tiền */}
        <View style={styles.guaranteeRow}>
          <Text style={styles.guaranteeText}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
          <View style={styles.questionMarkCircle}>
            <Text style={styles.questionMarkText}>?</Text>
          </View>
        </View>

        {/* Thông tin màu hiện tại */}
        <View style={styles.currentColorInfo}>
          <Text style={styles.currentColorLabel}>Màu đang chọn: </Text>
          <View style={[styles.miniColorDot, { backgroundColor: selectedPhone.colorHex }]} />
          <Text style={styles.currentColorValue}>{selectedPhone.colorName}</Text>
        </View>

        {/* Nút 4 MÀU-CHỌN MÀU > */}
        <TouchableOpacity style={styles.selectColorBtn} onPress={handleOpenColorPicker} activeOpacity={0.8}>
          <Text style={styles.selectColorBtnText}>4 MÀU - CHỌN MÀU</Text>
          <Text style={styles.arrowText}>❯</Text>
        </TouchableOpacity>

        {/* Nút CHỌN MUA */}
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow} activeOpacity={0.85}>
          <Text style={styles.buyButtonText}>CHỌN MUA</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  detailScrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 320,
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },
  phoneImage: {
    width: 240,
    height: 310,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 22,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 16,
  },
  starText: {
    fontSize: 18,
    color: '#E0B412',
    letterSpacing: 2,
  },
  reviewsText: {
    fontSize: 14,
    color: '#333333',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginRight: 20,
  },
  originalPrice: {
    fontSize: 15,
    color: '#808080',
    textDecorationLine: 'line-through',
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  guaranteeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EE0A0A',
    marginRight: 6,
  },
  questionMarkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMarkText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  currentColorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
  },
  currentColorLabel: {
    fontSize: 14,
    color: '#555',
  },
  miniColorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  currentColorValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  selectColorBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.46)',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectColorBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginRight: 10,
  },
  arrowText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  buyButton: {
    backgroundColor: '#EE0A0A',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EE0A0A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },

  // STYLES MÀN HÌNH 2 (CHỌN MÀU)
  colorHeader: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  backButtonText: {
    color: '#0D5CB6',
    fontSize: 14,
    fontWeight: '600',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 90,
    height: 110,
    marginRight: 14,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  headerSub: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  headerColorRow: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
  headerProviderRow: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  headerPrice: {
    fontSize: 17,
    fontWeight: '700',
    color: '#EE0A0A',
  },
  colorBody: {
    flex: 1,
    backgroundColor: '#C4C4C4',
    padding: 16,
    justifyContent: 'space-between',
  },
  colorBodyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
  },
  colorPalette: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  colorBox: {
    width: 85,
    height: 75,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedColorBox: {
    borderWidth: 3,
    borderColor: '#ffffff',
    transform: [{ scale: 1.06 }],
  },
  checkmarkBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: '#1952E6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CA1536',
    marginTop: 14,
    shadowColor: '#1952E6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});
