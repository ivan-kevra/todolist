import { Button } from "@/common/components/button";
import { EditableSpan } from "@/common/components/editableSpan/EditableSpan";
import { useActions } from "@/common/hooks/useActions";
import { TodolistDomainType, todolistsThunks } from "@/features/todolistList/model/todolists/todolists.slice";
import style from "./style.module.scss";

type Props = {
  title: string;
  todolist: TodolistDomainType;
};
export const TodolistTitle = ({ title, todolist }: Props) => {
  const { removeTodolist, updateTodolistTitle } = useActions(todolistsThunks);

  const changeTodolistTitleHandler = (title: string): void => {
    updateTodolistTitle({ id: todolist.id, title });
  };

  return (
    <div className={style.container}>
      <EditableSpan
        onClick={changeTodolistTitleHandler}
        value={title}
        disabled={todolist.entityStatus === "loading"}
        variant="h5"
      />
      <Button
        onClick={() => removeTodolist({ id: todolist.id })}
        disabled={todolist.entityStatus === "loading"}
        variant="secondary"
      >
        X
      </Button>
    </div>
  );
};
