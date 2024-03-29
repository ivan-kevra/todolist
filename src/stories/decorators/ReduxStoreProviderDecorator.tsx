import React from "react";
import { Provider } from "react-redux";
import { combineReducers } from "redux";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { BrowserRouter } from "react-router-dom";
import { TaskPriorities, TaskStatuses } from "@/common/enum/enum";

const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [
    {
      id: "todolistId1",
      title: "1st title",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: "todolistId2",
      title: "2nd title",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "loading",
    },
  ],
  reducers: {},
});
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    todolistId1: [
      {
        id: "taskId1",
        title: "CSS",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId1",
        entityStatus: "idle",
      },
      {
        id: "taskId2",
        title: "JS",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId1",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "React",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId1",
        entityStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: "taskId3",
        title: "bread",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId2",
        entityStatus: "idle",
      },
      {
        id: "taskId4",
        title: "tea",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId2",
        entityStatus: "idle",
      },
    ],
  },
  reducers: {},
});
const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle",
    error: null,
    isInitialized: true,
  },
  reducers: {},
});
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: true },
  reducers: {},
});

const rootReducer = combineReducers({
  todolists: todolistsSlice.reducer,
  tasks: tasksSlice.reducer,
  app: appSlice.reducer,
  auth: authSlice.reducer,
});

export const storyBookStore = configureStore({
  reducer: rootReducer,
});

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return (
    <Provider store={storyBookStore}>
      <BrowserRouter>{storyFn()}</BrowserRouter>
    </Provider>
  );
};

const isLoggedInauthSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {},
});

export const isLoggedInStoryBookStore = configureStore({
  reducer: { auth: isLoggedInauthSlice.reducer },
});

export const IsLoggedInReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return (
    <Provider store={isLoggedInStoryBookStore}>
      <BrowserRouter>{storyFn()}</BrowserRouter>
    </Provider>
  );
};
