import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { LoginParamsType, authAPI } from "../api/auth.api";
import { createAppAsyncThunk } from "../../../common/utils/createAppAsyncThunk";
import { RESULT_CODE } from "../../../common/enum/enum";
import { todolistsActions } from "@/features/todolistList/model/todolists/todolists.slice";

const slice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    );
  },
});
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  },
);
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.logout();
  if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
    dispatch(todolistsActions.clearTodolistsData());
    return { isLoggedIn: false };
  } else {
    return rejectWithValue(res.data);
  }
});
const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  `${slice.name}/initializeApp`,
  async (_, { rejectWithValue }) => {
    const res = await authAPI.me();
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout, initializeApp };
