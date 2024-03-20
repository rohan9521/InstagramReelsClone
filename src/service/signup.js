import { request } from "axiosInterceptor/AxiosInterceptor";

export const signup = (user) => {
  return request({ method: "post", data: { ...user }, url: "users" });
};
