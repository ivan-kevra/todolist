import { v1 } from "uuid";
import { FilterType, TodolistDomainType, todolistsActions, todolistsReducer, todolistsThunks } from "./todolists.slice";
import { TodolistType } from "../../api/todolists-api";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>;
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {
      id: todolistId1,
      title: "1st title",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: todolistId2,
      title: "2nd title",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ];
});
test("correct todolist should be removed", () => {
  const endState: Array<TodolistDomainType> = todolistsReducer(
    startState,
    todolistsThunks.removeTodolist.fulfilled({ id: todolistId1 }, "requestId", { id: todolistId1 }),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
test("correct todolist should be added", () => {
  const newTodolist: TodolistType = {
    addedDate: "",
    id: v1(),
    order: 0,
    title: "new todolist",
  };
  const endState: Array<TodolistDomainType> = todolistsReducer(
    startState,
    todolistsThunks.createTodolist.fulfilled({ todolist: newTodolist }, "requestId", { title: newTodolist.title }),
  );
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("new todolist");
});
test("correct todolist should change his name", () => {
  let newTodolistTitle = "new todolist ";

  const endState: Array<TodolistDomainType> = todolistsReducer(
    startState,
    todolistsThunks.updateTodolistTitle.fulfilled({ id: todolistId2, title: newTodolistTitle }, "requestId", {
      id: todolistId2,
      title: newTodolistTitle,
    }),
  );

  expect(endState[0].title).toBe("1st title");
  expect(endState[1].title).toBe(newTodolistTitle);
});
test("correct filter of todolist should be changed", () => {
  let newFilter: FilterType = "completed";
  const endState: Array<TodolistDomainType> = todolistsReducer(
    startState,
    todolistsActions.changeTodolistFilter({ id: todolistId2, filter: newFilter }),
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("completed");
});
test("todolists should be set", () => {
  const action = todolistsThunks.setTodolists.fulfilled({ todolists: startState }, "requestId");

  const endState: Array<TodolistDomainType> = todolistsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(todolistId1);
  expect(endState[0].title).toBe("1st title");
  expect(endState[1].id).toBe(todolistId2);
  expect(endState[1].title).toBe("2nd title");
});
test("correct entity status of todolist should be changed", () => {
  const endState: Array<TodolistDomainType> = todolistsReducer(
    startState,
    todolistsActions.setEntityStatus({ id: todolistId2, entityStatus: "loading" }),
  );

  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe("loading");
});
