import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  otherCosts: [],
  loading: false,
  error: null,
};

export const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState,
  reducers: {
    setOtherCosts: (state, action) => {
      state.otherCosts = action.payload;
    },
    addOtherCost: (state, action) => {
      state.otherCosts.push(action.payload);
    },
    updateOtherCost: (state, action) => {
      const { id, description, amount } = action.payload;
      const costIndex = state.otherCosts.findIndex(cost => cost.id === id);
      if (costIndex !== -1) {
        state.otherCosts[costIndex] = { ...state.otherCosts[costIndex], description, amount };
      }
    },
    deleteOtherCost: (state, action) => {
      state.otherCosts = state.otherCosts.filter(cost => cost.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setOtherCosts, 
  addOtherCost, 
  updateOtherCost, 
  deleteOtherCost, 
  setLoading, 
  setError 
} = otherCostsSlice.actions;

export default otherCostsSlice.reducer; 