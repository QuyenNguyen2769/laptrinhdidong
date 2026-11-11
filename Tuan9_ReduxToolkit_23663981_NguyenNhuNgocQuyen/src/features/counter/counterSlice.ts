import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  step: number;
  history: string[];
}

const initialState: CounterState = {
  value: 0,
  step: 1,
  history: ['Bắt đầu với giá trị 0'],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Tăng theo step
    increment: (state) => {
      state.value += state.step;
      state.history.unshift(`+ Tăng ${state.step} ➔ Giá trị: ${state.value}`);
      if (state.history.length > 8) state.history.pop();
    },
    // Giảm theo step
    decrement: (state) => {
      state.value -= state.step;
      state.history.unshift(`- Giảm ${state.step} ➔ Giá trị: ${state.value}`);
      if (state.history.length > 8) state.history.pop();
    },
    // Tăng một số lượng bất kỳ (ví dụ +5, +10)
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.history.unshift(`+ Cộng ${action.payload} ➔ Giá trị: ${state.value}`);
      if (state.history.length > 8) state.history.pop();
    },
    // Thay đổi bước nhảy step
    setStep: (state, action: PayloadAction<number>) => {
      state.step = Math.max(1, action.payload);
    },
    // Reset về 0
    reset: (state) => {
      state.value = 0;
      state.history.unshift(`↺ Đã Reset về 0`);
      if (state.history.length > 8) state.history.pop();
    },
  },
});

export const { increment, decrement, incrementByAmount, setStep, reset } = counterSlice.actions;

// Selector
export const selectCounterValue = (state: { counter: CounterState }) => state.counter.value;
export const selectCounterStep = (state: { counter: CounterState }) => state.counter.step;
export const selectCounterHistory = (state: { counter: CounterState }) => state.counter.history;

export default counterSlice.reducer;
