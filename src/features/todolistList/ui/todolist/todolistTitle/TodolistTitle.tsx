import { EditableSpan } from "@/common/components/editableSpan/EditableSpan";
import { useActions } from "@/common/hooks/useActions";
import { TodolistDomainType, todolistsThunks } from "@/features/todolistList/model/todolists/todolists.slice";

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
    <h3>
      <EditableSpan onClick={changeTodolistTitleHandler} value={title} disabled={todolist.entityStatus === "loading"} />
      <button onClick={() => removeTodolist({ id: todolist.id })} disabled={todolist.entityStatus === "loading"}>
        X
      </button>
    </h3>
  );
};
