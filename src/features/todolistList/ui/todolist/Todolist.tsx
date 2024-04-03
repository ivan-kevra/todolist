import { useEffect } from "react";
import { TodolistDomainType } from "../../model/todolists/todolists.slice";
import { AddItemForm } from "@/common/components/addItemForm.tsx/AddItemForm";
import { useActions } from "@/common/hooks/useActions";
import { tasksThunks } from "../../model/tasks/tasks.slice";
import { FilterTasksButtons } from "./filterTasksButtons/FilterTasksButtons";
import { Tasks } from "./tasks/Tasks";
import { TodolistTitle } from "./todolistTitle/TodolistTitle";
import style from "./style.module.scss";

type TodolistPropsType = {
  todolist: TodolistDomainType;
  demo?: boolean;
};

export const Todolist = ({ todolist, demo = false }: TodolistPropsType) => {
  const { title } = todolist;
  const { setTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    if (demo) {
      return;
    }
    setTasks(todolist.id);
  }, []);

  const addTaskHandler = (title: string) => {
    return addTask({ todolistId: todolist.id, title }).unwrap();
  };

  return (
    <div className={style.container}>
      <TodolistTitle title={title} todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
