import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

class BaseRequest {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Метод для выполнения GET запроса
    async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint, { params });
            return response.data;
        } catch (error) {
            const err = this.handleError(error);
            throw err;
        }
    }

    // Метод для выполнения POST запроса
    async post<T, R>(endpoint: string, data: T): Promise<R> {
        try {
            const response: AxiosResponse<R> = await this.axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            const err = this.handleError(error);
            throw err;
        }
    }

    // Метод для выполнения PUT запроса
    async put<T, R>(endpoint: string, data: T): Promise<R> {
        try {
            const response: AxiosResponse<R> = await this.axiosInstance.put(endpoint, data);
            return response.data;
        } catch (error) {
            const err = this.handleError(error);
            throw err;
        }
    }

    // Метод для выполнения DELETE запроса
    async delete<T>(endpoint: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint);
            return response.data;
        } catch (error) {
            const err = this.handleError(error);
            throw err;
        }
    }

    // Обработка ошибок
    private handleError(error: AxiosError) {
        if (error.response) {
            // Сервер вернул код ошибки
            return error.response.data;
        } else if (error.request) {
            // Запрос был отправлен, но ответа нет
            return error.request;
        } else {
            // Ошибка при настройке запроса
            return error.message;
        }
    }
}

export const baseRequest = new BaseRequest('http://localhost:4200')
