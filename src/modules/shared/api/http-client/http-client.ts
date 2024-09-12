import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export class HttpClient {
  protected instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 20000,
    });

    this.instance.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );
  }

  private handleSuccess(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleError(error: AxiosError): Promise<never> {
    console.error(error);
    return Promise.reject(error);
  }

  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig<T>
  ): Promise<R> {
    return this.instance.get<T, R>(url, config);
  }

  public post<T, B = unknown, R = AxiosResponse<T>>(
    url: string,
    body: B,
    config?: AxiosRequestConfig<T>
  ): Promise<R> {
    return this.instance.post<T, R>(url, body, config);
  }

  public put<T, B, R = AxiosResponse<T>>(url: string, body?: B): Promise<R> {
    return this.instance.put<T, R>(url, body);
  }

  public patch<T, B = unknown, R = AxiosResponse<T>>(
    url: string,
    body: B
  ): Promise<R> {
    return this.instance.patch<T, R>(url, body);
  }

  public delete<T, R = AxiosResponse<T>>(url: string): Promise<R> {
    return this.instance.delete<T, R>(url);
  }
}
