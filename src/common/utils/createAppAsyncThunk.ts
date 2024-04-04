import { AppRootStateType, AppDispatch } from "@/app/model/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseResponseType } from "../types/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null | BaseResponseType;
}>();
