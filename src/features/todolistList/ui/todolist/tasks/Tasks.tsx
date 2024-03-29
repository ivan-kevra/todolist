import { TaskStatuses } from "@/common/enum/enum";
import { TaskDomainType } from "@/features/todolistList/api/todolists-api";
import { tasksSelector } from "@/features/todolistList/model/tasks/tasks.selector";
import { TodolistDomainType, FilterType } from "@/features/todolistList/model/todolists/todolists.slice";
import { useSelector } from "react-redux";
import { Task } from "../../task/Task";

type Props = {
  todolist: TodolistDomainType;
};
export const Tasks = ({ todolist }: Props) => {
  let allTasks = useSelector(tasksSelector);
  const tasks = allTasks[todolist.id];

  const getTasksForRender = (tasks: Array<TaskDomainType>, filter: FilterType): Array<TaskDomainType> => {
    switch (filter) {
      case "all":
        return tasks;
      case "active":
        return tasks.filter((t: TaskDomainType) => t.status === TaskStatuses.New);
      case "completed":
        return tasks.filter((t: TaskDomainType) => t.status === TaskStatuses.Completed);
      default:
        return tasks;
    }
  };

  const filteredTasks: Array<TaskDomainType> = getTasksForRender(tasks, todolist.filter);

  return (
    <>
      {filteredTasks?.map((task: TaskDomainType) => {
        return (
          <Task
            key={task.id}
            taskId={task.id}
            todolistId={todolist.id}
            disabled={todolist.entityStatus === "loading" || task.entityStatus === "loading"}
          />
        );
      })}
    </>
  );
};
