import { authReducer } from "@/features/auth/model/auth.slice";
import { tasksReducer } from "@/features/todolistList/model/tasks/tasks.slice";
import { todolistsReducer } from "@/features/todolistList/model/todolists/todolists.slice";
import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
