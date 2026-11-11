import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  soldCount: number;
  isFavorite: boolean;
  imageKey: 'silver' | 'red' | 'black' | 'blue';
  description: string;
  specs: {
    screen: string;
    ram: string;
    rom: string;
    battery: string;
    camera: string;
  };
}

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod_1',
    name: 'Vsmart Joy 3 (3GB/32GB)',
    category: 'Smartphone',
    price: 1790000,
    originalPrice: 2290000,
    rating: 4.8,
    soldCount: 828,
    isFavorite: true,
    imageKey: 'blue',
    description: 'Vsmart Joy 3 nổi bật với cụm 3 camera AI chất lượng cao, màn hình tràn viền giọt nước và viên pin cực khủng 5000 mAh.',
    specs: {
      screen: '6.51 inch, HD+ IPS LCD',
      ram: '3 GB',
      rom: '32 GB (thẻ nhớ tối đa 64GB)',
      battery: '5000 mAh, sạc nhanh QC 3.0 18W',
      camera: 'Chính 13 MP & Phụ 8 MP, 2 MP',
    },
  },
  {
    id: 'prod_2',
    name: 'Vsmart Live 4 (6GB/64GB)',
    category: 'Smartphone',
    price: 3290000,
    originalPrice: 4090000,
    rating: 4.9,
    soldCount: 1420,
    isFavorite: false,
    imageKey: 'black',
    description: 'Vsmart Live 4 sở hữu màn hình đục lỗ thời thượng Full HD+, Snapdragon 675 mạnh mẽ và hệ điều hành VOS 3.0 mượt mà.',
    specs: {
      screen: '6.5 inch, Full HD+ LTPS LCD',
      ram: '6 GB',
      rom: '64 GB',
      battery: '5000 mAh, sạc nhanh Quick Charge 3.0',
      camera: 'Chính 48 MP & Phụ 8 MP, 5 MP, 2 MP',
    },
  },
  {
    id: 'prod_3',
    name: 'Vsmart Star 4 (2GB/16GB)',
    category: 'Phổ thông',
    price: 1390000,
    originalPrice: 1790000,
    rating: 4.6,
    soldCount: 650,
    isFavorite: true,
    imageKey: 'red',
    description: 'Lựa chọn lý tưởng cho học sinh, sinh viên và người lớn tuổi cần một chiếc smartphone bền bỉ, kết nối 4G tốc độ cao.',
    specs: {
      screen: '6.09 inch, HD+',
      ram: '2 GB',
      rom: '16 GB',
      battery: '3500 mAh',
      camera: 'Chính 8 MP & Phụ 5 MP',
    },
  },
  {
    id: 'prod_4',
    name: 'Vsmart Aris Pro 5G (8GB/128GB)',
    category: 'Flagship',
    price: 5490000,
    originalPrice: 7990000,
    rating: 5.0,
    soldCount: 310,
    isFavorite: false,
    imageKey: 'silver',
    description: 'Smartphone tiên phong ứng dụng công nghệ camera ẩn dưới màn hình đầu tiên tại Việt Nam cùng chip lượng tử bảo mật Quantum.',
    specs: {
      screen: '6.39 inch, AMOLED Full HD+',
      ram: '8 GB',
      rom: '128 GB',
      battery: '4000 mAh, sạc nhanh 18W',
      camera: '4 camera sau 64 MP + Camera ẩn 20 MP',
    },
  },
];

export default function Bai04_StackTabParams() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);

  // Stack Navigation State: 'HOME_TABS' (Màn hình 1) hoặc 'PRODUCT_DETAILS' (Màn hình 2)
  const [currentStackScreen, setCurrentStackScreen] = useState<'HOME_TABS' | 'PRODUCT_DETAILS'>('HOME_TABS');

  // Tab Navigation State trong Màn hình Home: 'PRODUCTS' | 'FAVORITES'
  const [currentTab, setCurrentTab] = useState<'PRODUCTS' | 'FAVORITES'>('PRODUCTS');

  // Params truyền sang màn hình chi tiết
  const [selectedProductParams, setSelectedProductParams] = useState<ProductItem | null>(null);

  // Hàm chuyển màn hình Stack và truyền params: navigation.navigate('ProductDetails', { ... })
  const navigateToProductDetails = (product: ProductItem) => {
    setSelectedProductParams(product);
    setCurrentStackScreen('PRODUCT_DETAILS');
  };

  // Hàm quay lại: navigation.goBack()
  const handleGoBack = () => {
    setCurrentStackScreen('HOME_TABS');
  };

  // Bật/tắt trạng thái yêu thích
  const toggleFavorite = (productId: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    if (selectedProductParams && selectedProductParams.id === productId) {
      setSelectedProductParams((prev) =>
        prev ? { ...prev, isFavorite: !prev.isFavorite } : null
      );
    }
  };

  const getPhoneImage = (key: string) => {
    switch (key) {
      case 'silver': return require('../assets/phones/vs_silver.png');
      case 'red': return require('../assets/phones/vs_red.png');
      case 'black': return require('../assets/phones/vs_black.png');
      default: return require('../assets/phones/vs_blue.png');
    }
  };

  const favoriteProducts = products.filter((p) => p.isFavorite);

  // ================= STACK SCREEN 2: PRODUCT DETAILS =================
  if (currentStackScreen === 'PRODUCT_DETAILS' && selectedProductParams) {
    const isFav = selectedProductParams.isFavorite;
    return (
      <SafeAreaView style={styles.container}>
        {/* Navigation Bar */}
        <View style={styles.detailsNavbar}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>← Quay lại danh sách</Text>
          </TouchableOpacity>
          <Text style={styles.navBarTitle} numberOfLines={1}>
            {selectedProductParams.name}
          </Text>
          <TouchableOpacity onPress={() => toggleFavorite(selectedProductParams.id)} style={styles.favNavBtn}>
            <Text style={styles.favNavIcon}>{isFav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* Thông tin Params nhận được */}
        <View style={styles.paramsBanner}>
          <Text style={styles.paramsText}>
            ✓ Đã truyền Params thành công: <Text style={styles.bold}>id = "{selectedProductParams.id}"</Text>
          </Text>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.detailScroll}>
          {/* Ảnh chi tiết */}
          <View style={styles.detailImageBox}>
            <Image
              source={getPhoneImage(selectedProductParams.imageKey)}
              style={styles.detailImg}
              resizeMode="contain"
            />
          </View>

          {/* Tên & Giá */}
          <Text style={styles.detailTitle}>{selectedProductParams.name}</Text>
          <View style={styles.detailPriceRow}>
            <Text style={styles.detailPrice}>{selectedProductParams.price.toLocaleString('vi-VN')} đ</Text>
            <Text style={styles.detailOldPrice}>{selectedProductParams.originalPrice.toLocaleString('vi-VN')} đ</Text>
            <View style={styles.detailBadge}>
              <Text style={styles.detailBadgeText}>Tiết kiệm {((1 - selectedProductParams.price / selectedProductParams.originalPrice) * 100).toFixed(0)}%</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaStar}>★★★★★ {selectedProductParams.rating}</Text>
            <Text style={styles.metaSold}>| Đã bán {selectedProductParams.soldCount}</Text>
            <Text style={styles.metaCat}>| Danh mục: {selectedProductParams.category}</Text>
          </View>

          {/* Mô tả */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>Mô tả sản phẩm</Text>
            <Text style={styles.sectionBody}>{selectedProductParams.description}</Text>
          </View>

          {/* Bảng thông số kỹ thuật */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>Thông số kỹ thuật</Text>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Màn hình:</Text>
              <Text style={styles.specValue}>{selectedProductParams.specs.screen}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>RAM:</Text>
              <Text style={styles.specValue}>{selectedProductParams.specs.ram}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Bộ nhớ trong:</Text>
              <Text style={styles.specValue}>{selectedProductParams.specs.rom}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Camera:</Text>
              <Text style={styles.specValue}>{selectedProductParams.specs.camera}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Dung lượng Pin:</Text>
              <Text style={styles.specValue}>{selectedProductParams.specs.battery}</Text>
            </View>
          </View>

          {/* Nút thao tác */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.favActionBtn, isFav && styles.favActionBtnActive]}
              onPress={() => toggleFavorite(selectedProductParams.id)}
            >
              <Text style={styles.favActionIcon}>{isFav ? '❤️ Đã thích' : '🤍 Yêu thích'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={() => Alert.alert('Thông báo', `Đã thêm ${selectedProductParams.name} vào giỏ hàng!`)}
            >
              <Text style={styles.addToCartText}>🛒 Thêm vào giỏ</Text>
            </TouchableOpacity>
          </View>

          {/* Nút quay lại bổ sung ở cuối trang */}
          <TouchableOpacity
            style={styles.bottomBackBtn}
            onPress={handleGoBack}
          >
            <Text style={styles.bottomBackBtnText}>← Quay lại danh sách sản phẩm</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ================= STACK SCREEN 1: HOME (TAB NAVIGATION) =================
  const currentList = currentTab === 'PRODUCTS' ? products : favoriteProducts;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Stack */}
      <View style={styles.stackHeader}>
        <Text style={styles.stackHeaderTitle}>Ứng dụng Mua sắm (Stack + Tab)</Text>
      </View>

      {/* Tab Navigation (Tab 1: Products, Tab 2: Favorites) */}
      <View style={styles.topTabBar}>
        <TouchableOpacity
          style={[styles.topTabItem, currentTab === 'PRODUCTS' && styles.topTabItemActive]}
          onPress={() => setCurrentTab('PRODUCTS')}
        >
          <Text style={[styles.topTabLabel, currentTab === 'PRODUCTS' && styles.topTabLabelActive]}>
            📱 Tab 1: Products ({products.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.topTabItem, currentTab === 'FAVORITES' && styles.topTabItemActive]}
          onPress={() => setCurrentTab('FAVORITES')}
        >
          <Text style={[styles.topTabLabel, currentTab === 'FAVORITES' && styles.topTabLabelActive]}>
            ❤️ Tab 2: Favorites ({favoriteProducts.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách hiển thị theo Tab */}
      <FlatList
        data={currentList}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>💔</Text>
            <Text style={styles.emptyTitle}>Chưa có sản phẩm yêu thích nào!</Text>
            <Text style={styles.emptyDesc}>Hãy quay lại Tab Products và nhấn vào biểu tượng trái tim để lưu sản phẩm bạn thích.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigateToProductDetails(item)}
            activeOpacity={0.8}
          >
            <Image source={getPhoneImage(item.imageKey)} style={styles.cardImg} resizeMode="contain" />
            <View style={styles.cardInfo}>
              <View style={styles.cardBadgeRow}>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.heartBtn}>
                  <Text style={styles.heartIcon}>{item.isFavorite ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.cardPrice}>{item.price.toLocaleString('vi-VN')} đ</Text>
              <Text style={styles.cardOldPrice}>{item.originalPrice.toLocaleString('vi-VN')} đ</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardRating}>★ {item.rating} ({item.soldCount})</Text>
                <View style={styles.detailsPill}>
                  <Text style={styles.detailsPillText}>Xem chi tiết ➔</Text>
                </View>
              </View>
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
    backgroundColor: '#F5F5F7',
  },
  stackHeader: {
    backgroundColor: '#6200EE',
    paddingVertical: 14,
    alignItems: 'center',
  },
  stackHeaderTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topTabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  topTabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  topTabItemActive: {
    borderBottomColor: '#6200EE',
  },
  topTabLabel: {
    fontSize: 13,
    color: '#757575',
    fontWeight: '600',
  },
  topTabLabelActive: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  productList: {
    padding: 12,
    paddingBottom: 24,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  cardImg: {
    width: 80,
    height: 100,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardCategory: {
    fontSize: 11,
    color: '#6200EE',
    fontWeight: '600',
  },
  heartBtn: {
    padding: 4,
  },
  heartIcon: {
    fontSize: 16,
  },
  cardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  cardOldPrice: {
    fontSize: 12,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  cardRating: {
    fontSize: 12,
    color: '#FFB300',
    fontWeight: '600',
  },
  detailsPill: {
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  detailsPillText: {
    fontSize: 11,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 18,
  },

  // STACK DETAILS SCREEN STYLES
  detailsNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  backArrow: {
    color: '#6200EE',
    fontSize: 13,
    fontWeight: 'bold',
  },
  navBarTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    maxWidth: 160,
  },
  favNavBtn: {
    padding: 6,
  },
  favNavIcon: {
    fontSize: 18,
  },
  paramsBanner: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#C8E6C9',
  },
  paramsText: {
    fontSize: 12,
    color: '#2E7D32',
  },
  bold: {
    fontWeight: 'bold',
  },
  detailScroll: {
    padding: 16,
    paddingBottom: 40,
  },
  detailImageBox: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  detailImg: {
    width: 180,
    height: 220,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 6,
  },
  detailPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginRight: 10,
  },
  detailOldPrice: {
    fontSize: 14,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  detailBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  detailBadgeText: {
    color: '#D32F2F',
    fontSize: 11,
    fontWeight: 'bold',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaStar: {
    fontSize: 13,
    color: '#FFB300',
    fontWeight: 'bold',
    marginRight: 6,
  },
  metaSold: {
    fontSize: 13,
    color: '#757575',
    marginRight: 6,
  },
  metaCat: {
    fontSize: 13,
    color: '#6200EE',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: 13,
    color: '#616161',
    lineHeight: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  specLabel: {
    fontSize: 13,
    color: '#757575',
  },
  specValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  favActionBtn: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  favActionBtnActive: {
    borderColor: '#FFCDD2',
    backgroundColor: '#FFEBEE',
  },
  favActionIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  addToCartBtn: {
    flex: 1.5,
    backgroundColor: '#6200EE',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bottomBackBtn: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#6200EE',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 30,
  },
  bottomBackBtnText: {
    color: '#6200EE',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
