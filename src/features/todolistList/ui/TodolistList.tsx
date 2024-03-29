import { FC, useEffect } from "react";
import { AddItemForm } from "../../../common/components/addItemForm.tsx/AddItemForm";
import { useActions } from "../../../common/hooks/useActions";
import { useAppSelector } from "../../../common/hooks/useAppDispatch";
import { isLoggedinSelector } from "../../auth/model/login.selector";
import { todolistsSelector } from "../model/todolists/todolists.selector";
import { TodolistDomainType, todolistsThunks } from "../model/todolists/todolists.slice";
import { Todolist } from "./todolist/Todolist";

import { Navigate } from "react-router-dom";

type Props = {
  demo: boolean;
};
export const TodolistList: FC<Props> = ({ demo = false }) => {
  const todolists = useAppSelector(todolistsSelector);

  const isLoggedIn = useAppSelector(isLoggedinSelector);

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
    <>
      <div>
        <AddItemForm addItem={addTodolist} />
      </div>
      {todolists.map((todolist: TodolistDomainType) => (
        <Todolist key={todolist.id} todolist={todolist} demo={demo} />
      ))}
    </>
  );
};
