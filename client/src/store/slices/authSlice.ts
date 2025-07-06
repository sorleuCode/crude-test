import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/axios";

interface AuthState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  status: "idle",
  error: "",
  isAuthenticated: false,
};

// REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    credentials: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      await api.post("/auth/register", credentials);
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Registration failed");
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      await api.post("/auth/login", credentials);
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

// LOGOUT USER
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await api.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // LOGOUT
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.status = "idle";
    });
  },
});

export default authSlice.reducer;
