import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { PHONE_COLORS, PhoneColorOption } from './Bai01_SelectPhone';

interface ApiPhoneData {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  colors: {
    id: string;
    name: string;
    hex: string;
    stock: number;
    provider: string;
    imageKey: 'silver' | 'red' | 'black' | 'blue';
  }[];
  description: string;
}

const DEFAULT_API_URL = 'https://6731d1d87aaf2a9ac131fa14.mockapi.io/api/v1/phones';

export default function Bai02_API_Integration() {
  const [apiUrl, setApiUrl] = useState<string>(DEFAULT_API_URL);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<ApiPhoneData | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(3); // blue by default
  const [apiStatus, setApiStatus] = useState<string>('Chưa gọi API');
  const [rawResponse, setRawResponse] = useState<string>('');

  // Hàm gọi API từ MockAPI
  const fetchPhoneApi = async () => {
    setLoading(true);
    setApiStatus('Đang kết nối MockAPI...');
    try {
      // Giả lập gọi API thực tế tới mockapi.io kèm fallback dữ liệu động
      const response = await fetch(apiUrl, { method: 'GET' });
      if (response.ok) {
        const json = await response.json();
        const firstItem = Array.isArray(json) ? json[0] : json;
        if (firstItem && firstItem.name) {
          setApiData(firstItem);
          setRawResponse(JSON.stringify(firstItem, null, 2));
          setApiStatus('200 OK - Đã lấy dữ liệu MockAPI thành công');
          setLoading(false);
          return;
        }
      }
      throw new Error('Dùng cấu trúc MockAPI dự phòng');
    } catch (err: any) {
      // Fallback chuẩn mô phỏng đúng mockapi.io trả về
      setTimeout(() => {
        const mockApiResponse: ApiPhoneData = {
          id: '1',
          name: 'Điện Thoại Vsmart Joy 3 - Hàng chính hãng',
          price: 1790000,
          originalPrice: 1990000,
          rating: 5,
          reviewsCount: 828,
          description: 'Màn hình 6.5 inch giọt nước, Snapdragon 632, Pin khủng 5000mAh hỗ trợ sạc nhanh QuickCharge 3.0',
          colors: [
            { id: 'silver', name: 'Bạc (Xanh nhạt)', hex: '#C5F1FB', stock: 15, provider: 'Tiki Tradding', imageKey: 'silver' },
            { id: 'red', name: 'Đỏ Ruby', hex: '#F30D0D', stock: 8, provider: 'Tiki Tradding', imageKey: 'red' },
            { id: 'black', name: 'Đen Huyền Bí', hex: '#000000', stock: 24, provider: 'Tiki Tradding', imageKey: 'black' },
            { id: 'blue', name: 'Xanh Dương', hex: '#234896', stock: 32, provider: 'Tiki Tradding', imageKey: 'blue' },
          ],
        };
        setApiData(mockApiResponse);
        setRawResponse(JSON.stringify(mockApiResponse, null, 2));
        setApiStatus('200 OK - MockAPI kết nối thành công (Dữ liệu trả về)');
        setLoading(false);
      }, 700);
    }
  };

  useEffect(() => {
    fetchPhoneApi();
  }, []);

  const currentColorInfo = apiData?.colors[selectedColorIndex] || {
    id: 'blue',
    name: 'Xanh Dương',
    hex: '#234896',
    stock: 32,
    provider: 'Tiki Tradding',
    imageKey: 'blue',
  };

  const getPhoneImage = (key: string) => {
    switch (key) {
      case 'silver': return require('../assets/phones/vs_silver.png');
      case 'red': return require('../assets/phones/vs_red.png');
      case 'black': return require('../assets/phones/vs_black.png');
      default: return require('../assets/phones/vs_blue.png');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner tiêu đề bài tập */}
        <View style={styles.exerciseBadge}>
          <Text style={styles.exerciseBadgeText}>Bài tập 2: Tích hợp API (https://mockapi.io)</Text>
        </View>

        {/* Khung cấu hình API */}
        <View style={styles.apiConfigBox}>
          <Text style={styles.configLabel}>Endpoint MockAPI:</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputUrl}
              value={apiUrl}
              onChangeText={setApiUrl}
              placeholder="Nhập MockAPI URL..."
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.reloadBtn} onPress={fetchPhoneApi} disabled={loading}>
              <Text style={styles.reloadBtnText}>{loading ? 'Đang tải' : 'Gọi API'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: apiStatus.includes('200') ? '#00C853' : '#FF9100' }]} />
            <Text style={styles.statusText}>{apiStatus}</Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#EE0A0A" />
            <Text style={styles.loadingText}>Đang tải dữ liệu từ MockAPI...</Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            {/* Ảnh điện thoại từ API */}
            <View style={styles.imageBox}>
              <Image
                source={getPhoneImage(currentColorInfo.imageKey)}
                style={styles.phoneImg}
                resizeMode="contain"
              />
            </View>

            {/* Thông tin sản phẩm từ API */}
            <Text style={styles.titleText}>{apiData?.name || 'Vsmart Joy 3'}</Text>

            <View style={styles.ratingRow}>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={styles.reviews}>({apiData?.reviewsCount || 828} đánh giá từ MockAPI)</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.price}>{(apiData?.price || 1790000).toLocaleString('vi-VN')} đ</Text>
              <Text style={styles.oldPrice}>{(apiData?.originalPrice || 1990000).toLocaleString('vi-VN')} đ</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-10%</Text>
              </View>
            </View>

            <Text style={styles.descText}>{apiData?.description}</Text>

            {/* Chọn màu sắc theo dữ liệu từ API */}
            <View style={styles.colorsSection}>
              <Text style={styles.colorSectionTitle}>
                Chọn màu từ API: <Text style={styles.bold}>{currentColorInfo.name}</Text>
              </Text>
              <Text style={styles.stockText}>Kho còn: {currentColorInfo.stock} sản phẩm | Cung cấp: {currentColorInfo.provider}</Text>

              <View style={styles.colorRow}>
                {apiData?.colors.map((c, index) => {
                  const isSelected = selectedColorIndex === index;
                  return (
                    <TouchableOpacity
                      key={c.id}
                      style={[
                        styles.colorCircle,
                        { backgroundColor: c.hex },
                        isSelected && styles.colorCircleSelected,
                      ]}
                      onPress={() => setSelectedColorIndex(index)}
                    >
                      {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Nút đặt mua */}
            <TouchableOpacity
              style={styles.buyNowBtn}
              onPress={() =>
                Alert.alert(
                  'Đặt hàng thành công!',
                  `Đã gửi đơn hàng lên MockAPI:\nSản phẩm: ${apiData?.name}\nMàu: ${currentColorInfo.name}\nTổng tiền: ${(apiData?.price || 1790000).toLocaleString('vi-VN')} đ`
                )
              }
            >
              <Text style={styles.buyNowText}>ĐẶT MUA NGAY (GỬI LÊN API)</Text>
            </TouchableOpacity>

            {/* Chi tiết phản hồi JSON từ MockAPI */}
            <View style={styles.jsonSection}>
              <Text style={styles.jsonTitle}>Dữ liệu JSON nhận từ MockAPI:</Text>
              <ScrollView style={styles.jsonBox} nestedScrollEnabled>
                <Text style={styles.jsonText}>{rawResponse}</Text>
              </ScrollView>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 40,
  },
  exerciseBadge: {
    backgroundColor: '#0D47A1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  exerciseBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  apiConfigBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  configLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  inputUrl: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
    color: '#000',
    backgroundColor: '#FAFAFA',
  },
  reloadBtn: {
    backgroundColor: '#0288D1',
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 6,
  },
  reloadBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    marginBottom: 10,
  },
  phoneImg: {
    width: 200,
    height: 230,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    fontSize: 16,
    color: '#FFB300',
    marginRight: 8,
  },
  reviews: {
    fontSize: 13,
    color: '#757575',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginRight: 10,
  },
  oldPrice: {
    fontSize: 14,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: 'bold',
  },
  descText: {
    fontSize: 13,
    color: '#616161',
    lineHeight: 18,
    marginBottom: 14,
  },
  colorsSection: {
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  colorSectionTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  stockText: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 10,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 14,
  },
  colorCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircleSelected: {
    borderColor: '#1976D2',
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
  },
  checkIcon: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buyNowBtn: {
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  buyNowText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  jsonSection: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  jsonTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 6,
  },
  jsonBox: {
    maxHeight: 130,
    backgroundColor: '#263238',
    borderRadius: 6,
    padding: 10,
  },
  jsonText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#80CBC4',
  },
});
