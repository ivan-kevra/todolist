import { instance } from "@/common/api/api";
import { TaskStatuses, TaskPriorities } from "@/common/enum/enum";
import { BaseResponseType } from "@/common/types/types";
import { TaskType } from "./todolists-api";

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(todolistId: string, taskId: string, task: UpdateTaskType) {
    return instance.put<BaseResponseType<{ task: UpdateTaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, task);
  },
};

//types
export type UpdateTaskType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

type GetTasksResponseType = {
  error: null | string;
  items: Array<TaskType>;
  totalCount: number;
};
