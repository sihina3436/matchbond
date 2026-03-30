import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthState {
  admin: Admin | null;
  loading: boolean;
  error: string | null;
}

// Get admin from localStorage
const getAdminFromLocalStorage = (): Admin | null => {
  try {
    const adminData = localStorage.getItem("admin");
    return adminData ? JSON.parse(adminData) : null;
  } catch (error) {
    console.error("Error parsing admin from localStorage:", error);
    return null;
  }
};

const initialState: AdminAuthState = {
  admin: getAdminFromLocalStorage(),
  loading: false,
  error: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      state.error = null;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.admin = null;
      state.error = null;
      localStorage.removeItem("admin");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setAdmin, logout, setLoading, setError, clearError } =
  adminAuthSlice.actions;
export default adminAuthSlice.reducer;
