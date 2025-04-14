import axios, { AxiosInstance } from 'axios';

class AxiosHelper {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async get(url: string, params?: any) {
        try {
            const response = await this.axiosInstance.get(url, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async post(url: string, data: any) {
        try {
            const response = await this.axiosInstance.post(url, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async put(url: string, data: any) {
        try {
            const response = await this.axiosInstance.put(url, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async delete(url: string) {
        try {
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any) {
        // Handle error as needed
        console.error('API call error:', error);
        throw error;
    }
}

export default AxiosHelper;