import { v1 } from "uuid";
import { TasksStateType, tasksReducer } from "./tasks/tasks.slice";
import { TodolistDomainType, todolistsReducer, todolistsThunks } from "./todolists/todolists.slice";
import { TodolistType } from "../api/todolists-api";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const newTodolist: TodolistType = {
    id: v1(),
    title: "new todolist",
    addedDate: "",
    order: 0,
  };

  const action = todolistsThunks.createTodolist.fulfilled({ todolist: newTodolist }, "requestId", {
    title: newTodolist.title,
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
