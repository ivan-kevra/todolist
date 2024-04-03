import { useTasks } from "../../lib/useTask";
import { EditableSpan } from "@/common/components/editableSpan/EditableSpan";
import { Button } from "@/common/components/button";
import style from "./style.module.scss";
import { Checkbox } from "@/common/components/checkbox/Checkbox";
import { TaskStatuses } from "@/common/enum/enum";
type Props = {
  taskId: string;
  todolistId: string;
  disabled?: boolean;
};
export const Task = ({ taskId, todolistId, disabled }: Props) => {
  const { task, removeTaskHandler, changeTaskStatus, changeTaskTitle } = useTasks(todolistId, taskId);

  const setStatus = (checked: boolean) => {
    changeTaskStatus(checked ? TaskStatuses.Completed : TaskStatuses.New);
  };

  return (
    <li key={task.id} className={style.container}>
      <Checkbox checked={task.status ? true : false} onValueChange={setStatus} />
      <EditableSpan value={task.title} onClick={changeTaskTitle} disabled={disabled} variant="body2" />
      <Button onClick={removeTaskHandler} disabled={disabled || task.entityStatus === "loading"} variant="secondary">
        X
      </Button>
    </li>
  );
};
