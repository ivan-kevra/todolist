import { Checkbox } from "@/common/components/checkbox/Checkbox";
import { useTasks } from "../../lib/useTask";
import { EditableSpan } from "@/common/components/editableSpan/EditableSpan";

type Props = {
  taskId: string;
  todolistId: string;
  disabled?: boolean;
};
export const Task = ({ taskId, todolistId, disabled }: Props) => {
  const { task, removeTaskHandler, changeTaskStatus, changeTaskTitle } = useTasks(todolistId, taskId);

  return (
    <li key={task.id}>
      <Checkbox status={task.status} callback={changeTaskStatus} />
      <EditableSpan value={task.title} onClick={changeTaskTitle} disabled={disabled} />
      <button onClick={removeTaskHandler} disabled={disabled || task.entityStatus === "loading"}>
        X
      </button>
    </li>
  );
};
