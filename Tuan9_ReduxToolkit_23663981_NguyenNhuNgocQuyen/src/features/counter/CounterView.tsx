import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  increment,
  decrement,
  incrementByAmount,
  setStep,
  reset,
  selectCounterValue,
  selectCounterStep,
  selectCounterHistory,
} from './counterSlice';

export default function CounterView() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCounterValue);
  const step = useAppSelector(selectCounterStep);
  const history = useAppSelector(selectCounterHistory);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>BÀI TẬP 1: COUNTER APP (REDUX TOOLKIT)</div>
        <h2 style={styles.title}>Bộ Đếm Giá Trị Thông Minh</h2>
        <p style={styles.subtitle}>
          Thực hành Slice, Actions (increment, decrement, reset), Reducers và Selectors
        </p>

        {/* Số Counter hiển thị trung tâm */}
        <div style={styles.displayBox}>
          <span style={{ ...styles.counterText, color: count > 0 ? '#10B981' : count < 0 ? '#EF4444' : '#6B7280' }}>
            {count}
          </span>
          <span style={styles.stepIndicator}>Bước nhảy hiện tại: <strong>±{step}</strong></span>
        </div>

        {/* Các nút bấm chính: Giảm, Reset, Tăng */}
        <div style={styles.buttonGroup}>
          <button style={{ ...styles.btn, ...styles.btnDanger }} onClick={() => dispatch(decrement())}>
            - Giảm ({step})
          </button>
          <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={() => dispatch(reset())}>
            ↺ Reset về 0
          </button>
          <button style={{ ...styles.btn, ...styles.btnSuccess }} onClick={() => dispatch(increment())}>
            + Tăng ({step})
          </button>
        </div>

        {/* Bài tập nâng cao: Nút +5, +10 và chọn bước nhảy Step */}
        <div style={styles.advancedSection}>
          <h4 style={styles.sectionHeader}>Tính năng nâng cao (Nhiệm vụ X trong đề bài):</h4>
          
          <div style={styles.actionRow}>
            <button style={{ ...styles.btnSmall, ...styles.btnIndigo }} onClick={() => dispatch(incrementByAmount(5))}>
              + Tăng nhanh 5
            </button>
            <button style={{ ...styles.btnSmall, ...styles.btnIndigo }} onClick={() => dispatch(incrementByAmount(10))}>
              + Tăng nhanh 10
            </button>
            <button style={{ ...styles.btnSmall, ...styles.btnOrange }} onClick={() => dispatch(incrementByAmount(-10))}>
              - Giảm nhanh 10
            </button>
          </div>

          <div style={styles.stepControl}>
            <label style={styles.label}>Tùy chỉnh bước nhảy (Step):</label>
            <div style={styles.stepButtons}>
              {[1, 2, 5, 10, 50].map((s) => (
                <button
                  key={s}
                  style={{
                    ...styles.stepBtn,
                    ...(step === s ? styles.stepBtnActive : {}),
                  }}
                  onClick={() => dispatch(setStep(s))}
                >
                  Step = {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lịch sử Action Dispatch */}
        <div style={styles.historySection}>
          <h4 style={styles.historyTitle}>📜 Lịch sử Action Redux đã Dispatch:</h4>
          <ul style={styles.historyList}>
            {history.map((log, index) => (
              <li key={index} style={styles.historyItem}>
                <span style={styles.bullet}>•</span> {log}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '750px',
    margin: '0 auto',
    padding: '10px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
    fontWeight: '700',
    fontSize: '12px',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '10px',
    letterSpacing: '0.5px',
  },
  title: {
    fontSize: '24px',
    color: '#1F2937',
    fontWeight: '800',
    margin: '0 0 6px 0',
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '14px',
    margin: '0 0 25px 0',
  },
  displayBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: '14px',
    padding: '24px',
    border: '2px dashed #E5E7EB',
    marginBottom: '24px',
  },
  counterText: {
    fontSize: '72px',
    fontWeight: '900',
    display: 'block',
    lineHeight: '1',
    fontFamily: 'monospace',
  },
  stepIndicator: {
    fontSize: '13px',
    color: '#6B7280',
    marginTop: '10px',
    display: 'block',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '14px',
    marginBottom: '30px',
  },
  btn: {
    padding: '12px 24px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnSuccess: {
    backgroundColor: '#10B981',
    color: '#ffffff',
  },
  btnDanger: {
    backgroundColor: '#EF4444',
    color: '#ffffff',
  },
  btnSecondary: {
    backgroundColor: '#6B7280',
    color: '#ffffff',
  },
  advancedSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: '12px',
    padding: '18px',
    textAlign: 'left',
    marginBottom: '20px',
    border: '1px solid #E2E8F0',
  },
  sectionHeader: {
    fontSize: '14px',
    color: '#334155',
    margin: '0 0 12px 0',
    fontWeight: '700',
  },
  actionRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  btnSmall: {
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
  btnIndigo: {
    backgroundColor: '#4F46E5',
    color: '#ffffff',
  },
  btnOrange: {
    backgroundColor: '#F59E0B',
    color: '#ffffff',
  },
  stepControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
  },
  stepButtons: {
    display: 'flex',
    gap: '8px',
  },
  stepBtn: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    border: '1px solid #CBD5E1',
    backgroundColor: '#ffffff',
    color: '#475569',
    cursor: 'pointer',
    fontWeight: '600',
  },
  stepBtnActive: {
    backgroundColor: '#4F46E5',
    color: '#ffffff',
    borderColor: '#4F46E5',
  },
  historySection: {
    backgroundColor: '#1E293B',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'left',
  },
  historyTitle: {
    color: '#94A3B8',
    fontSize: '13px',
    margin: '0 0 10px 0',
    fontWeight: '600',
  },
  historyList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  historyItem: {
    fontSize: '13px',
    color: '#E2E8F0',
    padding: '4px 0',
    fontFamily: 'monospace',
  },
  bullet: {
    color: '#38BDF8',
    marginRight: '6px',
  },
};
