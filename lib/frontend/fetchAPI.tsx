import axios, { AxiosResponse } from 'axios';

interface FetchAPIProps {
  method: string;
  url: string;
  body?: any;
  params?: any;
  headers?: any;
}

/**
 * @description use axios to make a request to the url with AUTH
 */
export const fetchAPI = async (props: FetchAPIProps): Promise<AxiosResponse> => {
  const formattedHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(props?.headers ?? {}),
  };

  return axios({
    method: props.method,
    headers: formattedHeaders,
    url: props.url,
    data: props.body ?? {},
    params: props?.params ?? {},
  });
};
