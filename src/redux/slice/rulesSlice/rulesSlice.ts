import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RulesState {
  rules: string[];
}

const initialState: RulesState = {
  rules: [],
};

const RulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    addRules(state, action: PayloadAction<string>) {
      state.rules = [...state.rules, action.payload]; // Fixing this line
    },
    removeRules(state, action: PayloadAction<string>) {
      state.rules = state.rules.filter((rules: string) => rules !== action.payload);
    },
    clearRules(state) {
      state.rules = []
    }
  },
});

export const { addRules, removeRules, clearRules } = RulesSlice.actions;

export default RulesSlice.reducer;
