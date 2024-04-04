import { FC, useEffect } from "react";
import { useActions } from "../../../common/hooks/useActions";
import { useAppSelector } from "../../../common/hooks/useAppDispatch";
import { isLoggedinSelector } from "../../auth/model/login.selector";
import { TodolistDomainType, todolistsThunks } from "../model/todolists/todolists.slice";
import { Navigate } from "react-router-dom";
import style from "./style.module.scss";
import { AddItemForm } from "@/common/components/addItemForm.tsx/AddItemForm";
import { todolistsSelector } from "../model/todolists/todolists.selector";
import { Todolist } from "./todolist/Todolist";
type Props = {
  demo: boolean;
};
export const TodolistList: FC<Props> = ({ demo = false }) => {
  const isLoggedIn = useAppSelector(isLoggedinSelector);
  const todolists = useAppSelector(todolistsSelector);

  const { setTodolists, createTodolist } = useActions(todolistsThunks);

  useEffect(() => {
    if (demo || !isLoggedIn) return;
    setTodolists();
  }, [isLoggedIn]);

  const addTodolist = (title: string) => {
    return createTodolist({ title }).unwrap();
  };

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={style.container}>
      {/* <Header /> */}

      <AddItemForm addItem={addTodolist} placeholder="Enter new to do" />

      <div className={style.todolists}>
        {todolists.map((todolist: TodolistDomainType) => (
          <Todolist key={todolist.id} todolist={todolist} demo={demo} />
        ))}
      </div>
    </div>
  );
};
