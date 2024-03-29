import { AppRootStateType } from "./store";

export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized;
export const errorSelector = (state: AppRootStateType) => state.app.error;
export const statusSelector = (state: AppRootStateType) => state.app.status;
