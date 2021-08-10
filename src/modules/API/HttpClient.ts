import axios, { AxiosInstance } from 'axios';

export class HttpClient {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: this.getBaseUrl(),
            headers: this.getHeaders(),
        });
    }

    private getBaseUrl(): string {
        return 'https://api.github.com/'; // should be process.env.REACT_BACKEND_URL;
    }

    private getHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
    }

    async get<ReturnType>(url: string, { params }: { params?: Record<string, unknown> } = {}): Promise<ReturnType> {
        const { data } = await this.client.get<ReturnType>(url, { params });
        return data;
    }

    async post<ReturnType, RequestDataType>(url: string, requestData: RequestDataType): Promise<ReturnType> {
        const { data } = await this.client.post<ReturnType>(url, requestData);
        return data;
    }

    async put<ReturnType, RequestDataType>(url: string, requestData: RequestDataType): Promise<ReturnType> {
        const { data } = await this.client.put<ReturnType>(url, requestData);
        return data;
    }

    async path<ReturnType, RequestDataType>(url: string, requestData: RequestDataType): Promise<ReturnType> {
        const { data } = await this.client.patch<ReturnType>(url, requestData);
        return data;
    }
}
