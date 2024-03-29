import { TaskStatuses } from "@/common/enum/enum";
import { ChangeEvent, FC, memo } from "react";

type PropsType = {
  status: TaskStatuses;
  callback: (status: TaskStatuses) => void;
};

export const Checkbox: FC<PropsType> = memo(({ status, callback }) => {
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const newIsDone = e.currentTarget.checked;
    callback(newIsDone ? TaskStatuses.Completed : TaskStatuses.New);
  };
  return <input type="checkbox" checked={status === TaskStatuses.Completed} onChange={onChangeTaskStatusHandler} />;
});
