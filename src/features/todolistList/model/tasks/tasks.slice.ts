import { RequestStatusType, appActions } from "@/app/model/app.slice";
import { RESULT_CODE, TaskStatuses, TaskPriorities } from "@/common/enum/enum";
import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tasksAPI, UpdateTaskType } from "../../api/tasks-api";
import { TodolistType, TaskType, UpdateArgTaskType, TaskDomainType } from "../../api/todolists-api";
import { todolistsThunks, todolistsActions } from "../todolists/todolists.slice";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: RequestStatusType }>,
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], entityStatus: action.payload.entityStatus };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunks.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsThunks.setTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((todolist: TodolistType) => (state[todolist.id] = []));
      })
      .addCase(todolistsActions.clearTodolistsData, () => {
        return {};
      })
      .addCase(setTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((task: TaskType) => ({
          ...task,
          entityStatus: "idle",
        }));
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift({ ...action.payload.task, entityStatus: "idle" });
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      });
  },
});

// thunks
const setTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  `${slice.name}/setTasks`,
  async (todolistId, thunkAPI) => {
    const res = await tasksAPI.getTasks(todolistId);
    return { todolistId, tasks: res.data.items };
  },
);
const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
  "tasks/addTask",
  async (arg, { rejectWithValue }) => {
    const res = await tasksAPI.createTask(arg.todolistId, arg.title);
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      const task = res.data.data.item;
      return { task };
    } else {
      return rejectWithValue(res.data);
    }
  },
);
const removeTask = createAppAsyncThunk<{ todolistId: string; taskId: string }, { todolistId: string; taskId: string }>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(
      tasksActions.changeTaskEntityStatus({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        entityStatus: "loading",
      }),
    );
    const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId).finally(() => {
      dispatch(
        tasksActions.changeTaskEntityStatus({ entityStatus: "idle", taskId: arg.taskId, todolistId: arg.todolistId }),
      );
    });
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { todolistId: arg.todolistId, taskId: arg.taskId };
    } else {
      return rejectWithValue(res.data);
    }
  },
);
const updateTask = createAppAsyncThunk<UpdateArgTaskType, UpdateArgTaskType>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;

    const task = getState().tasks[arg.todolistId].find((item: TaskType) => item.id === arg.taskId);
    if (!task) {
      dispatch(appActions.setAppError({ error: "Task not found" }));
      return rejectWithValue(null);
    }
    const apiModel: UpdateTaskType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      title: task.title,
      ...arg.domainModel,
    };
    const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return arg;
    } else {
      return rejectWithValue(res.data);
    }
  },
);

//types
export type TasksStateType = Record<string, TaskDomainType[]>;

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { setTasks, addTask, removeTask, updateTask };
