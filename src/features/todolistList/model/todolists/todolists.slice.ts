import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TodolistType, todolistsAPI } from "../../api/todolists-api";
import { createAppAsyncThunk } from "../../../../common/utils/createAppAsyncThunk";
import { RequestStatusType } from "@/app/model/app.slice";
import { RESULT_CODE } from "@/common/enum/enum";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state: TodolistDomainType[], action: PayloadAction<{ id: string; filter: FilterType }>) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    setEntityStatus: (
      state: TodolistDomainType[],
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>,
    ) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id);
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    },
    clearTodolistsData: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTodolists.fulfilled, (_state, action) => {
        return action.payload.todolists.map((todolist: TodolistType) => ({
          ...todolist,
          filter: "all",
          entityStatus: "idle",
        }));
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = { ...action.payload.todolist, entityStatus: "idle", filter: "all" };
        state.unshift(newTodolist);
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(updateTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) state[index].title = action.payload.title;
      });
  },
});

// thunks

const setTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  `${slice.name}/setTodolists`,
  async () => {
    const res = await todolistsAPI.getTodolists();
    return { todolists: res.data };
  },
);
const createTodolist = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>(
  `${slice.name}/createTodolist`,
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const res = await todolistsAPI.createTodolist(arg.title);
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { todolist: res.data.data.item };
    } else {
      return rejectWithValue(res.data);
    }
  },
);
const removeTodolist = createAppAsyncThunk<{ id: string }, { id: string }>(
  `${slice.name}/removeTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(todolistsActions.setEntityStatus({ id: arg.id, entityStatus: "loading" }));
    const res = await todolistsAPI.deleteTodolist(arg.id).finally(() => {
      dispatch(todolistsActions.setEntityStatus({ id: arg.id, entityStatus: "idle" }));
    });
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { id: arg.id };
    } else {
      return rejectWithValue(res.data);
    }
  },
);
const updateTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
  `${slice.name}/updateTodolistTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(todolistsActions.setEntityStatus({ id: arg.id, entityStatus: "loading" }));
    const res = await todolistsAPI.updateTodolist(arg.id, arg.title);
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(todolistsActions.setEntityStatus({ id: arg.id, entityStatus: "idle" }));
      return { id: arg.id, title: arg.title };
    } else {
      dispatch(todolistsActions.setEntityStatus({ id: arg.id, entityStatus: "idle" }));
      return rejectWithValue(res.data);
    }
  },
);

// types

export type FilterType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};
type UpdateTodolistTitleArgType = {
  id: string;
  title: string;
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { setTodolists, createTodolist, removeTodolist, updateTodolistTitle };
