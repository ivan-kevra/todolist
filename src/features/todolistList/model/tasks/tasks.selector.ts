import { AppRootStateType } from "app/model/store";

export const tasksSelector = (state: AppRootStateType) => state.tasks;
