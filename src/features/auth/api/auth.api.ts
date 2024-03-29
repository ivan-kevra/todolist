import { BaseResponseType } from "common/types/types";
import { instance } from "../../../common/api/api";

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<UserType>>(`/auth/login`, data);
  },
  me() {
    return instance.get<BaseResponseType<{ user: UserType }>>(`/auth/me`);
  },
  logout() {
    return instance.delete<BaseResponseType>(`/auth/login`);
  },
};
//types
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};
export type UserType = {
  id: number;
  email: string;
  login: string;
};
