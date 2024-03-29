import { tasksAPI, UpdateTaskType } from "@/features/todolistList/api/tasks-api";
import { todolistsAPI } from "@/features/todolistList/api/todolists-api";
import { ChangeEvent, useEffect, useState } from "react";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => setState(res.data));
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState("");
  const createTodolistHandler = () => {
    todolistsAPI.createTodolist(title).then((res) => setState(res.data));
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  return (
    <div>
      <div>
        <input placeholder="title" value={title} onChange={onChangeHandler} />
        <button onClick={createTodolistHandler}>create todolist</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");

  const deleteTodolistHandler = () => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => setState(res.data));
  };
  const onChangeTodolistIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value);
  };
  return (
    <div>
      <div>
        <input placeholder="todolistId" value={todolistId} onChange={onChangeTodolistIdHandler} />
        <button onClick={deleteTodolistHandler}>delete todolist</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [title, setTitle] = useState("");

  const onChangeTodolistIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value);
  };
  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  const updateTodolistTitleHandler = () => {
    todolistsAPI.updateTodolist(todolistId, title).then((res) => setState(res.data));
  };
  return (
    <div>
      <div>
        <input placeholder="todolistId" value={todolistId} onChange={onChangeTodolistIdHandler} />
        <input placeholder="title" value={title} onChange={onChangeTitleHandler} />
        <button onClick={updateTodolistTitleHandler}>change title</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};
export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const getTasksHandler = () => {
    tasksAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
      console.log(res.data);
    });
  };
  const onChangeTodolistIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value);
  };
  return (
    <div>
      <div>
        <input placeholder="todolistId" value={todolistId} onChange={onChangeTodolistIdHandler} />
        <button onClick={getTasksHandler}>get tasks</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [taskId, setTaskId] = useState("");
  const onChangeTodolistIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value);
  };
  const onChangeTaskIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskId(event.currentTarget.value);
  };
  const createTaskHandler = () => {
    tasksAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data));
  };
  return (
    <div>
      <div>
        <input placeholder="todolistId" value={todolistId} onChange={onChangeTodolistIdHandler} />
        <input placeholder="taskId" value={taskId} onChange={onChangeTaskIdHandler} />
        <button onClick={createTaskHandler}>delete task</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [title, setTitle] = useState("");

  const onChangeIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value);
  };
  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  const deleteTaskHandler = () => {
    tasksAPI.createTask(todolistId, title).then((res) => setState(res.data));
  };
  return (
    <div>
      <div>
        <input placeholder="todolistId" value={todolistId} onChange={onChangeIdHandler} />
        <input placeholder="title" value={title} onChange={onChangeTitleHandler} />
        <button onClick={deleteTaskHandler}>create task</button>
      </div>

      {JSON.stringify(state)}
    </div>
  );
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("cdc59010-b253-4256-83be-f88e8459c7e2");
  const [taskId, setTaskId] = useState<string>("1a0e32a6-f461-485c-a2c5-5f77591cd0f1");
  const [title, setTitle] = useState<string>("NEW TITLE");

  const model: UpdateTaskType = {
    title,
    description: "",
    status: 0,
    priority: 0,
    startDate: "",
    deadline: "",
  };

  const updateTaskHandler = () => {
    tasksAPI.updateTask(todolistId, taskId, model).then((res) => setState(res.data));
  };
  const onChangeTodolistIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value);
  };
  const onChangeTaskIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskId(event.currentTarget.value);
  };
  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return (
    <div>
      <div>
        <input placeholder="todolistId" value={todolistId} onChange={onChangeTodolistIdHandler} />
        <input placeholder="taskId" value={taskId} onChange={onChangeTaskIdHandler} />
        <input placeholder="title" value={title} onChange={onChangeTitleHandler} />
        <button onClick={updateTaskHandler}>update task</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};
