import { v1 } from "uuid";
import { TasksStateType, tasksReducer, tasksThunks } from "./tasks.slice";
import { todolistsThunks } from "../todolists/todolists.slice";
import { TaskPriorities, TaskStatuses } from "common/enum/enum";
import { TaskDomainType, TodolistType } from "../../api/todolists-api";

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    ["todolistId1"]: [
      {
        id: "1",
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
        id: "2",
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
        id: "3",
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
    ["todolistId2"]: [
      {
        id: "1",
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
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
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
        id: "3",
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
  };
});
test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(
    startState,
    tasksThunks.removeTask.fulfilled({ todolistId: "todolistId2", taskId: "2" }, "requestId", {
      todolistId: "todolistId2",
      taskId: "2",
    }),
  );
  expect(endState).toEqual({
    ["todolistId1"]: [
      {
        id: "1",
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
        id: "2",
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
        id: "3",
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
    ["todolistId2"]: [
      {
        id: "1",
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
        id: "3",
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
  });
});
test("correct task should be added to correct array", () => {
  const newTask: TaskDomainType = {
    id: "3",
    title: "juce",
    status: TaskStatuses.New,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: TaskPriorities.Low,
    startDate: "",
    todoListId: "todolistId2",
    entityStatus: "idle",
  };
  const endState = tasksReducer(
    startState,
    tasksThunks.addTask.fulfilled({ task: newTask }, "requestId", { todolistId: "todolistId2", title: "juce" }),
  );
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    tasksThunks.updateTask.fulfilled(
      {
        todolistId: "todolistId2",
        taskId: "2",
        domainModel: {
          status: TaskStatuses.New,
        },
      },
      "requestId",
      {
        todolistId: "todolistId2",
        taskId: "2",
        domainModel: {
          status: TaskStatuses.New,
        },
      },
    ),
  );
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});
test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    tasksThunks.updateTask.fulfilled(
      {
        todolistId: "todolistId2",
        taskId: "2",
        domainModel: {
          title: "juice",
        },
      },
      "requestId",
      {
        todolistId: "todolistId2",
        taskId: "2",
        domainModel: {
          title: "juice",
        },
      },
    ),
  );
  expect(endState["todolistId2"][1].title).toBe("juice");
  expect(endState["todolistId1"][1].title).toBe("JS");
});
test("new array should be added new todolist is added", () => {
  const newTodolist: TodolistType = {
    addedDate: "",
    id: v1(),
    order: 0,
    title: "new todolist",
  };

  const action = todolistsThunks.createTodolist.fulfilled({ todolist: newTodolist }, "requestId", {
    title: newTodolist.title,
  });
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("property with todolistId should be deleted", () => {
  const action = todolistsThunks.removeTodolist.fulfilled({ id: "todolistId2" }, "requestId", { id: "todolistId2" });
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
test("task should be added for todolist", () => {
  const action = tasksThunks.setTasks.fulfilled(
    { todolistId: "todolistId1", tasks: startState["todolistId1"] },
    "requestId",
    "todolistId1",
  );

  const endState = tasksReducer(
    {
      todolistId1: [],
      todolistId2: [],
    },
    action,
  );
  const keys = Object.keys(endState);
  expect(keys.length).toBe(2);
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});
