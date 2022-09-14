import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const useApi = <ResponseType = unknown>() => {
  const isLoading = ref(false);
  const isSuccessful = ref(false);
  const isFailed = ref(false);
  const data = ref<ResponseType>();
  const response = ref<AxiosResponse<ResponseType, any>>();
  const error = ref<unknown>();
  const status = ref<'success' | 'error' | 'loading' | 'iddle'>('iddle');

  const sendHttpRequest = async (method: string, url: string, config?: AxiosRequestConfig) => {
    isLoading.value = true;
    isSuccessful.value = false;
    isFailed.value = false;
    data.value = undefined;
    error.value = undefined;
    status.value = 'loading';

    return await http
      .request<ResponseType>({ method, url, ...config })
      .then((httpResponse) => {
        response.value = httpResponse;
        data.value = httpResponse.data;
        isSuccessful.value = true;
        status.value = 'success';
      })
      .catch((requestError) => {
        error.value = requestError;
        if (axios.isAxiosError(requestError)) {
          error.value = requestError.response?.data;
          response.value = requestError.response as AxiosResponse<ResponseType, any>;
        }
        isFailed.value = true;
        status.value = 'error';
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return {
    isLoading,
    isSuccessful,
    isFailed,
    data,
    error,
    response,
    status,
    reset: () => {
      isLoading.value = false;
      isSuccessful.value = false;
      isFailed.value = false;
      data.value = undefined;
      error.value = undefined;
      status.value = 'iddle';
    },
    onSuccess: (callback: (data: ResponseType, response?: AxiosResponse<ResponseType, any>) => void) => {
      watch([isSuccessful, data, response], ([isSuccessful, data, response]) => {
        if (isSuccessful) {
          callback(data as ResponseType, response);
        }
      });
    },
    onFail: (callback: (error: unknown, response?: AxiosResponse<ResponseType, any>) => void) => {
      watch([isFailed, error, response], ([isFailed, error, response]) => {
        if (isFailed) {
          callback(error, response);
        }
      });
    },
    get: (url: string, config?: AxiosRequestConfig) => {
      return sendHttpRequest('get', url, config);
    },
    post: (url: string, data?: unknown) => {
      return sendHttpRequest('post', url, { data });
    },
    put: (url: string, data?: unknown) => {
      return sendHttpRequest('put', url, { data });
    },
    patch: (url: string, data?: unknown) => {
      return sendHttpRequest('patch', url, { data });
    },
    delete: (url: string) => {
      return sendHttpRequest('delete', url);
    },
  };
};
