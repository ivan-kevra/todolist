import { RequestStatusType } from "@/app/model/app.slice";
import { instance } from "@/common/api/api";
import { TaskPriorities, TaskStatuses } from "@/common/enum/enum";
import { BaseResponseType } from "@/common/types/types";
import { UpdateDomainTaskModelType } from "../model/tasks/tasks.slice";

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>(`todo-lists`, { title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, { title });
  },
};

//types

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TaskType = {
  addedDate: string;
  deadline: string;
  description: string;
  id: string;
  order: number;
  priority: TaskPriorities;
  startDate: string;
  status: TaskStatuses;
  title: string;
  todoListId: string;
};
export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType;
};

export type UpdateArgTaskType = {
  todolistId: string;
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
};
