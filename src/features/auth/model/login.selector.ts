import { AppRootStateType } from "@/app/model/store";

export const isLoggedinSelector = (state: AppRootStateType) => state.auth.isLoggedIn;
