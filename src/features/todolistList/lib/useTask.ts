import { tasksSelector } from "../model/tasks/tasks.selector";
import { TaskDomainType } from "../api/todolists-api";
import { tasksThunks } from "../model/tasks/tasks.slice";
import { TaskStatuses } from "@/common/enum/enum";
import { useActions } from "@/common/hooks/useActions";
import { useAppSelector } from "@/common/hooks/useAppDispatch";

export const useTasks = (todolistId: string, taskId: string) => {
  const tasks = useAppSelector(tasksSelector);
  const task = tasks[todolistId].filter((item: TaskDomainType) => item.id === taskId)[0];

  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => {
    removeTask({ todolistId, taskId: task.id });
  };

  const changeTaskStatus = (status: TaskStatuses) => {
    updateTask({ todolistId, taskId: task.id, domainModel: { status } });
  };

  const changeTaskTitle = (title: string) => {
    updateTask({ todolistId, taskId: task.id, domainModel: { title } });
  };
  return { task, removeTaskHandler, changeTaskStatus, changeTaskTitle };
};
