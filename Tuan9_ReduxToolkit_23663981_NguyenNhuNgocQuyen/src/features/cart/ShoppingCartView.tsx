import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  CartItem,
} from './cartSlice';

// Danh sách sản phẩm mẫu theo đúng hướng dẫn Mục XIV trong file đề bài
const SAMPLE_PRODUCTS: Omit<CartItem, 'quantity'>[] = [
  { id: 1, name: 'Laptop Dell XPS 13', price: 1200, category: 'Máy tính xách tay' },
  { id: 2, name: 'Chuột không dây Logitech MX', price: 45, category: 'Phụ kiện' },
  { id: 3, name: 'Bàn phím cơ Mechanical Keyboard', price: 120, category: 'Gaming Gear' },
  { id: 4, name: 'Màn hình LG 27" UltraFine 4K', price: 350, category: 'Màn hình' },
  { id: 5, name: 'Cáp sạc USB-C Lightning Cable', price: 15, category: 'Cáp kết nối' },
  { id: 6, name: 'Tai nghe Bluetooth Sony WH-1000XM5', price: 300, category: 'Âm thanh' },
];

export default function ShoppingCartView() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <div style={styles.container}>
      <div style={styles.headerBanner}>
        <div style={styles.badge}>BÀI TẬP 2: SHOPPING CART (LEVEL 1)</div>
        <h2 style={styles.title}>Hệ Thống Quản Lý Giỏ Hàng</h2>
        <p style={styles.subtitle}>
          Thực hiện 4 Action: <code>addToCart</code>, <code>removeFromCart</code>, <code>updateQuantity</code>, <code>clearCart</code>
        </p>
      </div>

      <div style={styles.layout}>
        {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM MẪU */}
        <div style={styles.leftCol}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>🛍️ Danh Mục Sản Phẩm</h3>
              <span style={styles.badgeGray}>{SAMPLE_PRODUCTS.length} sản phẩm</span>
            </div>

            <div style={styles.productList}>
              {SAMPLE_PRODUCTS.map((product) => {
                const itemInCart = cartItems.find((i) => i.id === product.id);
                return (
                  <div key={product.id} style={styles.productCard}>
                    <div style={styles.productInfo}>
                      <span style={styles.productCat}>{product.category}</span>
                      <h4 style={styles.productName}>{product.name}</h4>
                      <span style={styles.productPrice}>${product.price.toLocaleString()}</span>
                    </div>

                    <button
                      style={{
                        ...styles.addBtn,
                        ...(itemInCart ? styles.addBtnActive : {}),
                      }}
                      onClick={() => dispatch(addToCart(product))}
                    >
                      {itemInCart ? `+ Thêm tiếp (${itemInCart.quantity} trong giỏ)` : '+ Thêm vào giỏ'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: GIỎ HÀNG & TỔNG TIỀN */}
        <div style={styles.rightCol}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                🛒 Giỏ Hàng Của Bạn <span style={styles.cartCountPill}>({totalItems})</span>
              </h3>
              {cartItems.length > 0 && (
                <button style={styles.clearBtn} onClick={() => dispatch(clearCart())}>
                  🗑️ Xóa hết giỏ
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div style={styles.emptyCartBox}>
                <span style={styles.emptyIcon}>🛒</span>
                <p style={styles.emptyTitle}>Giỏ hàng đang trống!</p>
                <p style={styles.emptySub}>Hãy nhấn nút "+ Thêm vào giỏ" ở cột bên trái để mua sản phẩm.</p>
              </div>
            ) : (
              <div style={styles.cartItemsList}>
                {cartItems.map((item) => (
                  <div key={item.id} style={styles.cartItemRow}>
                    <div style={styles.cartItemDetails}>
                      <h5 style={styles.cartItemName}>{item.name}</h5>
                      <span style={styles.cartItemUnitPrice}>Đơn giá: ${item.price}</span>
                    </div>

                    {/* Bộ tăng giảm số lượng */}
                    <div style={styles.qtyControl}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      >
                        -
                      </button>
                      <span style={styles.qtyNumber}>{item.quantity}</span>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      >
                        +
                      </button>
                    </div>

                    {/* Thành tiền item */}
                    <div style={styles.itemTotalCol}>
                      <span style={styles.itemTotalPrice}>${(item.price * item.quantity).toLocaleString()}</span>
                      <button style={styles.deleteIconBtn} onClick={() => dispatch(removeFromCart(item.id))}>
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                {/* TỔNG KẾT HÓA ĐƠN */}
                <div style={styles.summaryBox}>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Tổng số lượng hàng:</span>
                    <span style={styles.summaryValue}>{totalItems} món</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Tạm tính:</span>
                    <span style={styles.summaryValue}>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div style={styles.divider} />
                  <div style={{ ...styles.summaryRow, ...styles.summaryTotalRow }}>
                    <span style={styles.totalLabel}>TỔNG TIỀN PHẢI TRẢ:</span>
                    <span style={styles.totalValue}>${totalPrice.toLocaleString()}</span>
                  </div>

                  <button
                    style={styles.checkoutBtn}
                    onClick={() =>
                      alert(`Đã thanh toán thành công!\nSố lượng: ${totalItems} món\nTổng tiền: $${totalPrice.toLocaleString()}`)
                    }
                  >
                    💳 TIẾN HÀNH THANH TOÁN (${totalPrice.toLocaleString()})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '10px',
  },
  headerBanner: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#ECFDF5',
    color: '#059669',
    fontWeight: '700',
    fontSize: '12px',
    padding: '4px 14px',
    borderRadius: '20px',
    marginBottom: '8px',
  },
  title: {
    fontSize: '24px',
    color: '#111827',
    fontWeight: '800',
    margin: '0 0 6px 0',
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '14px',
    margin: 0,
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '20px',
    alignItems: 'start',
  },
  leftCol: {},
  rightCol: {},
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #F3F4F6',
    paddingBottom: '14px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#1F2937',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  badgeGray: {
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
    fontSize: '12px',
    padding: '3px 8px',
    borderRadius: '6px',
    fontWeight: '600',
  },
  cartCountPill: {
    color: '#059669',
  },
  clearBtn: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  productCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #E5E7EB',
    backgroundColor: '#FAFAFA',
  },
  productInfo: {
    flex: 1,
  },
  productCat: {
    fontSize: '11px',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  productName: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1F2937',
    margin: '2px 0 4px 0',
  },
  productPrice: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#059669',
  },
  addBtn: {
    backgroundColor: '#10B981',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  addBtnActive: {
    backgroundColor: '#047857',
  },
  emptyCartBox: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  emptyIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '10px',
  },
  emptyTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#374151',
    margin: '0 0 6px 0',
  },
  emptySub: {
    fontSize: '13px',
    color: '#9CA3AF',
    margin: 0,
  },
  cartItemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cartItemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
  },
  cartItemDetails: {
    flex: 1,
    paddingRight: '10px',
  },
  cartItemName: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 2px 0',
  },
  cartItemUnitPrice: {
    fontSize: '12px',
    color: '#6B7280',
  },
  qtyControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#ffffff',
    padding: '2px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
  },
  qtyBtn: {
    width: '26px',
    height: '26px',
    border: 'none',
    backgroundColor: '#F3F4F6',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#374151',
  },
  qtyNumber: {
    fontSize: '13px',
    fontWeight: '700',
    minWidth: '20px',
    textAlign: 'center',
    color: '#111827',
  },
  itemTotalCol: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: '12px',
  },
  itemTotalPrice: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#059669',
    minWidth: '55px',
    textAlign: 'right',
  },
  deleteIconBtn: {
    backgroundColor: 'transparent',
    color: '#9CA3AF',
    border: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '4px',
  },
  summaryBox: {
    marginTop: '16px',
    padding: '16px',
    borderRadius: '10px',
    backgroundColor: '#F0FDF4',
    border: '1px solid #BBF7D0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  summaryLabel: {
    fontSize: '13px',
    color: '#4B5563',
  },
  summaryValue: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1F2937',
  },
  divider: {
    height: '1px',
    backgroundColor: '#86EFAC',
    margin: '10px 0',
  },
  summaryTotalRow: {
    alignItems: 'center',
    marginBottom: '14px',
  },
  totalLabel: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#166534',
  },
  totalValue: {
    fontSize: '20px',
    fontWeight: '900',
    color: '#15803D',
  },
  checkoutBtn: {
    width: '100%',
    backgroundColor: '#15803D',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(21, 128, 61, 0.3)',
  },
};
