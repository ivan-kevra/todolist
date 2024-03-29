import { authThunks } from "@/features/auth/model/auth.slice";
import { createSlice, PayloadAction, isPending, isRejected, AnyAction, isFulfilled, isAnyOf } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialzied: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed";
        if (action.payload) {
          if (
            action.type.includes("createTodolist") ||
            action.type.includes("addTask") ||
            action.type.includes("initializeApp")
          )
            return;
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred";
        }
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected), (state, action) => {
        state.isInitialized = true;
      });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type AppInitialStateType = ReturnType<typeof slice.getInitialState>;
