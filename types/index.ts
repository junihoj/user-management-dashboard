import { UserRoleEnum, UserStatusEnum } from "@/constants/enums";
import { AxiosRequestConfig, Method } from "axios";

export type TApiServiceConfig = {
  url: string;
  method?: Method;
  data?: any;
  // headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;
  headers?: AxiosRequestConfig["headers"];
  otherConfig?: AxiosRequestConfig;
};
export type TApiService = (config: TApiServiceConfig) => Promise<any>;

export type TRole = "user" | "admin";

export type TAuthTokens = {
  accessToken?: string;
  refreshToken?: string;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
  profilePhoto?: string;
};
