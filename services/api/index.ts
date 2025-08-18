import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { RawAxiosRequestConfig } from 'axios';
import i18n from '~/services/i18n';
import { storage } from '~/services/storage';

export const apiClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export const ApiProvider = QueryClientProvider;

const createHttpClient = () => {
  return axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': i18n.locale,
      Authorization: process.env.EXPO_PUBLIC_AUTH,
      AuthToken: storage.getString('authToken'),
    },
  });
};

type ApiProps = {
  method: RawAxiosRequestConfig['method'];
  url: RawAxiosRequestConfig['url'];
  params?: Record<string, any>;
};

export const makeApiCall = async <T>(props: ApiProps): Promise<T> => {
  const axiosInstance = createHttpClient();
  const response = await axiosInstance(props);
  return response.data as T;
};
