import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  sidebarOpen: boolean;
  toast: string | null;
};

const initialState: UiState = {
  sidebarOpen: false,
  toast: null
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    showToast(state, action: PayloadAction<string>) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    }
  }
});

export const { clearToast, setSidebarOpen, showToast } = uiSlice.actions;
export default uiSlice.reducer;
