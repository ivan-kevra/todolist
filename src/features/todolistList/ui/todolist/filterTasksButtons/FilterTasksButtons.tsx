import { useActions } from "@/common/hooks/useActions";
import {
  TodolistDomainType,
  todolistsActions,
  FilterType,
} from "@/features/todolistList/model/todolists/todolists.slice";
import style from "./style.module.scss";
import { Button } from "@/common/components/button";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { changeTodolistFilter } = useActions(todolistsActions);
  const { id, filter } = todolist;

  const changeTodolistFilterHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const filter = e.currentTarget.getAttribute("data-name") as FilterType;
    changeTodolistFilter({ id, filter });
  };
  return (
    <div className={style.container}>
      <Button
        onClick={changeTodolistFilterHandler}
        data-name={"all"}
        variant={filter === "all" ? "primary" : "secondary"}
      >
        All
      </Button>
      <Button
        onClick={changeTodolistFilterHandler}
        data-name={"active"}
        variant={filter === "active" ? "primary" : "secondary"}
      >
        Active
      </Button>
      <Button
        onClick={changeTodolistFilterHandler}
        data-name={"completed"}
        variant={filter === "completed" ? "primary" : "secondary"}
      >
        Completed
      </Button>
    </div>
  );
};
