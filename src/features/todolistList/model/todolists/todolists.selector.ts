import { AppRootStateType } from "@/app/model/store";

export const todolistsSelector = (state: AppRootStateType) => state.todolists;
