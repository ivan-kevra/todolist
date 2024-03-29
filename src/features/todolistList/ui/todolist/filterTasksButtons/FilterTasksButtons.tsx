import { useActions } from "@/common/hooks/useActions";
import {
  TodolistDomainType,
  todolistsActions,
  FilterType,
} from "@/features/todolistList/model/todolists/todolists.slice";
import style from "./FilterTasksButtons.module.css";

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
    <div>
      <button
        className={filter === "all" ? style.activeBUtton : ""}
        onClick={changeTodolistFilterHandler}
        data-name={"all"}
      >
        All
      </button>
      <button
        className={filter === "active" ? "btn-active" : ""}
        onClick={changeTodolistFilterHandler}
        data-name={"active"}
      >
        Active
      </button>
      <button
        className={filter === "completed" ? "btn-active" : ""}
        onClick={changeTodolistFilterHandler}
        data-name={"completed"}
      >
        Completed
      </button>
    </div>
  );
};
