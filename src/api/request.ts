import axios, { Method, AxiosResponse } from "axios";

const api = axios.create();

const Request = <T>(
  method: Method,
  url: string,
  params: any
): Promise<AxiosResponse<T>> => {
  return api.request<T>({
    method,
    url,
    params,
  });
};

export default Request;
